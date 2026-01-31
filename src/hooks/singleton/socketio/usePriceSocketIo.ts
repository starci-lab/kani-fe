import { useRef, useEffect } from "react"
import { createManager } from "./utils"
import EventEmitter2 from "eventemitter2"
import { 
    PublicationPriceEventPayload, 
    PublicationEvent, 
    SubscribePricesEventPayload, 
    SubscriptionEvent, 
    WsResponse
} from "./config"
import { usePrivy } from "@privy-io/react-auth"
import { 
    PublicationPrice, 
    setPrices, 
    useAppDispatch, 
    useAppSelector 
} from "@/redux"
import { superjson } from "@/modules/superjson"
import { InternalSocketIoEvent } from "./events"

// declare pyth socket io event emitter
export const priceSocketIoEventEmitter = new EventEmitter2()

export const usePriceSocketIo = () => {
    // create socket io client
    const socketRef = useRef(createManager().socket("/price"))
    const dispatch = useAppDispatch()
    const tokenIds = useAppSelector(state => state.socket.tokenIds)
    // on socket io connect
    useEffect(() => {
        const socket = socketRef.current
        // on connect
        socket.on("connect", () => {
            console.log(`[Price Socket] Connected — ID: ${socket.id}`)
        })
        // on pyth prices updated
        socket.on(
            PublicationEvent.Price, (payload: WsResponse) => {
                if (!payload.success) {
                    return
                }
                const { results } = superjson.parse<PublicationPriceEventPayload>(payload.data)
                priceSocketIoEventEmitter.emit(
                    InternalSocketIoEvent.PriceUpdated, 
                    results
                )
            })
        socket.on(
            SubscriptionEvent.Price, (data: SubscribePricesEventPayload) => {
                console.log(data)
            })
        // on disconnect
        socket.on("disconnect", (reason) => {
            console.log(`[Price Socket] Disconnected — reason: ${reason}`)
        })
        // on connect error
        socket.on("connect_error", (err) => {
            console.error("[Price Socket] Connection error:", err.message)
        })
        return () => {
            socket.off("connect")
            socket.off("disconnect")
            socket.off("connect_error")
            socket.off(SubscriptionEvent.Price)
            socket.off(PublicationEvent.Price)
        }
    }, [])

    useEffect(() => {
        const socket = socketRef.current
        if (!tokenIds.length) {
            return
        }
        socket.emit(
            SubscriptionEvent.Price, 
            {
                ids: tokenIds,
            }
        )
    }, [tokenIds])

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
            payload: Record<string, PublicationPrice>
        ) => {
            dispatch(setPrices(payload))
        }
        priceSocketIoEventEmitter.on(InternalSocketIoEvent.PriceUpdated, handleEvent)
        return () => {
            priceSocketIoEventEmitter.off(InternalSocketIoEvent.PriceUpdated, handleEvent)
        }
    }, [dispatch])
    return socketRef.current
}