import { useRef, useEffect } from "react"
import { createManager } from "./utils"
import EventEmitter2 from "eventemitter2"
import { 
    PublicationPriceEventPayload, 
    PublicationEvent, 
    SubscribePricesEventPayload, 
    SubscriptionEvent 
} from "./config"
import { usePrivy } from "@privy-io/react-auth"

// declare pyth socket io event emitter
export const priceSocketIoEventEmitter = new EventEmitter2()

export const usePriceSocketIo = () => {
    // create socket io client
    const socketRef = useRef(createManager().socket("/price"))

    // on socket io connect
    useEffect(() => {
        const socket = socketRef.current
        // on connect
        socket.on("connect", () => {
            console.log(`[Price Socket] Connected — ID: ${socket.id}`)
            socket.emit(SubscriptionEvent.Price, {
                ids: ["c26f0fad66ee1e7aa802392d"],
            })
        })
        // on pyth prices updated
        socket.on(
            PublicationEvent.Price, (data: PublicationPriceEventPayload) => {
                console.log(data)
                priceSocketIoEventEmitter.emit(PublicationEvent.Price, data)
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
        }
    }, [])

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
    
    return socketRef.current
}