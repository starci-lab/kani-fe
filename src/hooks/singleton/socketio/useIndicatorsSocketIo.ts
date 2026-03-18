import { useRef, useEffect } from "react"
import { createManager } from "./utils"
import EventEmitter2 from "eventemitter2"
import { 
    PublicationEvent,  
    PublicationIndicatorsEventPayload,  
    SubscriptionEvent,
    WsResponse
} from "./config"
import { usePrivy } from "@privy-io/react-auth"
import { superjson } from "@/modules/superjson"
import { InternalSocketIoEvent } from "./events"
import { ViolateIndicatorResultEntry, setIndicators } from "@/redux"
import { useAppDispatch, useAppSelector } from "@/redux"

// declare core socket io event emitter
export const indicatorsSocketIoEventEmitter = new EventEmitter2()

export const useIndicatorsSocketIo = () => {
    // create socket io client
    const socketRef = useRef(createManager().socket("/indicators"))
    const dispatch = useAppDispatch()
    const botId = useAppSelector(state => state.bot.bot?.id)
    // on socket io connect
    useEffect(() => {
        const socket = socketRef.current
        // on connect
        socket.on(
            SubscriptionEvent.Indicators, 
            (payload: WsResponse) => {
                if (payload.success) {
                    console.log(`[Indicators Socket] ${payload.message}`)
                } else {
                    console.error(`[Indicators Socket] ${payload.error}`)
                }
            }
        )
        // on dynamic data updated
        socket.on(
            PublicationEvent.Indicators, 
            (
                payload: WsResponse
            ) => {
                if (!payload.success) {
                    return
                }
                const { entries } = superjson.parse<PublicationIndicatorsEventPayload>(payload.data)
                indicatorsSocketIoEventEmitter
                    .emit(
                        InternalSocketIoEvent.IndicatorsUpdated, 
                        entries
                    )
            }
        )
        socket.on(
            "connect", () => {
                console.log(`[Indicators Socket] Connected — ID: ${socket.id}`)
            }
        )
        // on disconnect
        socket.on("disconnect", (reason) => {
            console.log(`[Indicators Socket] Disconnected — reason: ${reason}`)
        })
        // on connect error
        socket.on("connect_error", (err) => {
            console.error("[Indicators Socket] Connection error:", err.message)
        })
        socket.on("exception", (err) => {
            console.error("[Indicators Socket] Exception:", err.message)
        })
        return () => {
            socket.off("connect")
            socket.off("disconnect")
            socket.off("connect_error")
            socket.off(SubscriptionEvent.Indicators)
            socket.off(PublicationEvent.Indicators)
        }
    }, [])

    useEffect(() => {
        const socket = socketRef.current
        if (!botId) {
            return
        }
        socket.emit(
            SubscriptionEvent.Indicators, 
            {
                botId: botId,
            }
        )
    }, [botId])

    const { authenticated, getAccessToken } = usePrivy()
    // if access token is present, connect to socket io
    useEffect(() => {
        if (!authenticated) {
            return
        }
        const handleEffect = async () => {
            const accessToken = await getAccessToken()
            if (!accessToken) {
                return
            }
            const socket = socketRef.current
            // set auth token
            socket.auth = {
                token: accessToken,
            }
            socket.connect()
        }
        handleEffect()
    }, [authenticated, getAccessToken])

    useEffect(() => {
        const handleEvent = async (
            entries: Array<ViolateIndicatorResultEntry>
        ) => {
            dispatch(setIndicators(entries))
        }
        indicatorsSocketIoEventEmitter.on(
            InternalSocketIoEvent.IndicatorsUpdated, 
            handleEvent
        )
        return () => {
            indicatorsSocketIoEventEmitter.off(
                InternalSocketIoEvent.IndicatorsUpdated, 
                handleEvent
            )
        }
    }, [dispatch])
    return socketRef.current
}