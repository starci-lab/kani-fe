import { useRef, useEffect } from "react"
import { createManager } from "./utils"
import EventEmitter2 from "eventemitter2"
import { 
    PublicationDynamicLiquidityPoolsInfoEventPayload, 
    PublicationEvent, 
    SubscribeDynamicLiquidityPoolsInfoEventPayload, 
    SubscriptionEvent
} from "./config"
import { usePrivy } from "@privy-io/react-auth"

// declare core socket io event emitter
export const dynamicLiquidityPoolInfoSocketIoEventEmitter = new EventEmitter2()

export const useDynamicLiquidityPoolInfoSocketIo = () => {
    // create socket io client
    const socketRef = useRef(createManager().socket("/dynamic-liquidity-pool-info"))

    // on socket io connect
    useEffect(() => {
        const socket = socketRef.current
        // on connect
        socket.on(
            SubscriptionEvent.DynamicLiquidityPoolsInfo, 
            (payload: SubscribeDynamicLiquidityPoolsInfoEventPayload) => {
                console.log(payload)
            }
        )
        socket.on(
            PublicationEvent.DynamicLiquidityPoolsInfo, 
            (payload: PublicationDynamicLiquidityPoolsInfoEventPayload) => {
                console.log(payload)
            }
        )
        // on dynamic data updated
        socket.on(
            PublicationEvent.DynamicLiquidityPoolsInfo, 
            (
                payload: PublicationDynamicLiquidityPoolsInfoEventPayload
            ) => {
                console.log(payload)
            }
        )
        socket.on(
            "connect", () => {
                console.log(`[Dynamic Liquidity Pool Info Socket] Connected — ID: ${socket.id}`)
                socket.emit(
                    SubscriptionEvent.DynamicLiquidityPoolsInfo, {
                        ids: ["c26f0fad66ee1e7aa802392d"],
                    }
                )
            }
        )
        // on disconnect
        socket.on("disconnect", (reason) => {
            console.log(`[Dynamic Liquidity Pool Info Socket] Disconnected — reason: ${reason}`)
        })
        // on connect error
        socket.on("connect_error", (err) => {
            console.error("[Dynamic Liquidity Pool Info Socket] Connection error:", err.message)
        })
        socket.on("exception", (err) => {
            console.error("[Dynamic Liquidity Pool Info Socket] Exception:", err.message)
        })
        return () => {
            socket.off("connect")
            socket.off("disconnect")
            socket.off("connect_error")
        }
    }, [])

    const { authenticated, getAccessToken } = usePrivy()
    // if access token is present, connect to socket io
    useEffect(() => {
        if (!authenticated) {
            return
        }
        const handleEffect = async () => {
            const accessToken = await getAccessToken()
            console.log("accessToken", accessToken)
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