import { useRef, useEffect } from "react"
import { createManager } from "./utils"
import EventEmitter2 from "eventemitter2"
import { 
    PublicationEvent, 
    SubscriptionEvent, 
    WsResponse,
    PublicationConfirmWithdrawalEventPayload
} from "./config"
import { usePrivy } from "@privy-io/react-auth"
import { 
    setConfirmWithdrawal, 
    useAppDispatch, 
    useAppSelector 
} from "@/redux"
import { InternalSocketIoEvent } from "./events"
import { superjson } from "@/modules/superjson"

// declare callback socket io event emitter
export const callbackSocketIoEventEmitter = new EventEmitter2()

export const useCallbackSocketIo = () => {
    // create socket io client
    const socketRef = useRef(createManager().socket("/callback"))
    const dispatch = useAppDispatch()
    const id = useAppSelector(state => state.bot.id)
    // on socket io connect
    useEffect(() => {
        const socket = socketRef.current
        // on connect
        socket.on("connect", () => {
            console.log(`[Callback Socket] Connected — ID: ${socket.id}`)
        })
        // on confirm withdrawal
        socket.on(
            SubscriptionEvent.ConfirmWithdrawal, (payload: WsResponse) => {
                console.log(payload)
            })
        socket.on(
            PublicationEvent.ConfirmWithdrawal, (payload: WsResponse) => {
                if (!payload.success) {
                    return
                }
                const { botId, txHashes, receivedTokens } = superjson.parse<PublicationConfirmWithdrawalEventPayload>(payload.data)
                callbackSocketIoEventEmitter.emit(
                    InternalSocketIoEvent.ConfirmWithdrawal, 
                    {
                        botId,
                        txHashes,
                        receivedTokens,
                    }
                )
            })
        // on disconnect
        socket.on("disconnect", (reason) => {
            console.log(`[Callback Socket] Disconnected — reason: ${reason}`)
        })
        // on connect error
        socket.on("connect_error", (err) => {
            console.error("[Callback Socket] Connection error:", err.message)
        })
        return () => {
            socket.off("connect")
            socket.off("disconnect")
            socket.off("connect_error")
            socket.off(SubscriptionEvent.ConfirmWithdrawal)
            socket.off(PublicationEvent.ConfirmWithdrawal)
        }
    }, [id])

    useEffect(() => {
        const socket = socketRef.current
        if (!id) {
            return
        }
        socket.emit(
            SubscriptionEvent.ConfirmWithdrawal, 
            {
                botId: id,
            }
        )
    }, [id])

    const { getAccessToken, authenticated } = usePrivy()
    // if totp is verified, connect to socket io
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
            payload: PublicationConfirmWithdrawalEventPayload
        ) => {
            dispatch(
                setConfirmWithdrawal(
                    {
                        botId: payload.botId,
                        txHashes: payload.txHashes,
                        receivedTokens: payload.receivedTokens,
                    }
                )
            )
        }
        callbackSocketIoEventEmitter.on(InternalSocketIoEvent.ConfirmWithdrawal, handleEvent)
        return () => {
            callbackSocketIoEventEmitter.off(InternalSocketIoEvent.ConfirmWithdrawal, handleEvent)
        }
    }, [dispatch])
    return socketRef.current
}