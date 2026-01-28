import { useRef, useEffect } from "react"
import { createManager } from "./utils"
import EventEmitter2 from "eventemitter2"
import { 
    PublicationDynamicLiquidityPoolsInfoEventPayload,
    PublicationEvent,  
    SubscriptionEvent,
    WsResponse
} from "./config"
import { usePrivy } from "@privy-io/react-auth"
import { superjson } from "@/modules/superjson"
import { InternalSocketIoEvent } from "./events"
import { PublicationDynamicLiquidityPoolInfo, setDynamicLiquidityPoolInfos } from "@/redux"
import { useAppDispatch, useAppSelector } from "@/redux"

// declare core socket io event emitter
export const dynamicLiquidityPoolInfoSocketIoEventEmitter = new EventEmitter2()

export const useDynamicLiquidityPoolInfoSocketIo = () => {
    // create socket io client
    const socketRef = useRef(createManager().socket("/dynamic-liquidity-pool-info"))
    const dispatch = useAppDispatch()
    const liquidityPoolIds = useAppSelector(state => state.socket.liquidityPoolIds)
    // on socket io connect
    useEffect(() => {
        const socket = socketRef.current
        // on connect
        socket.on(
            SubscriptionEvent.DynamicLiquidityPoolsInfo, 
            (payload: WsResponse) => {
                if (payload.success) {
                    console.log(`[Dynamic Liquidity Pool Info Socket] ${payload.message}`)
                } else {
                    console.error(`[Dynamic Liquidity Pool Info Socket] ${payload.error}`)
                }
            }
        )
        // on dynamic data updated
        socket.on(
            PublicationEvent.DynamicLiquidityPoolsInfo, 
            (
                payload: WsResponse
            ) => {
                if (!payload.success) {
                    return
                }
                const { results } = superjson.parse<PublicationDynamicLiquidityPoolsInfoEventPayload>(payload.data)
                dynamicLiquidityPoolInfoSocketIoEventEmitter
                    .emit(
                        InternalSocketIoEvent.DynamicLiquidityPoolInfoUpdated, 
                        results
                    )
            }
        )
        socket.on(
            "connect", () => {
                console.log(`[Dynamic Liquidity Pool Info Socket] Connected — ID: ${socket.id}`)
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
            socket.off(SubscriptionEvent.DynamicLiquidityPoolsInfo)
            socket.off(PublicationEvent.DynamicLiquidityPoolsInfo)
        }
    }, [])

    useEffect(() => {
        const socket = socketRef.current
        if (!liquidityPoolIds.length) {
            return
        }
        socket.emit(
            SubscriptionEvent.DynamicLiquidityPoolsInfo, 
            {
                ids: liquidityPoolIds,
            }
        )
    }, [liquidityPoolIds])

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
            results: Record<string, PublicationDynamicLiquidityPoolInfo>
        ) => {
            dispatch(setDynamicLiquidityPoolInfos(results))
        }
        dynamicLiquidityPoolInfoSocketIoEventEmitter.on(
            InternalSocketIoEvent.DynamicLiquidityPoolInfoUpdated, 
            handleEvent
        )
        return () => {
            dynamicLiquidityPoolInfoSocketIoEventEmitter.off(
                InternalSocketIoEvent.DynamicLiquidityPoolInfoUpdated, 
                handleEvent
            )
        }
    }, [dispatch])
    return socketRef.current
}