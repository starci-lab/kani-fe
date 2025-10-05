import { useRef, useEffect } from "react"
import { createManager } from "./utils"
import { useAppSelector, useAppDispatch } from "@/redux"
import { SessionStorage, SessionStorageKey } from "@/modules"
import EventEmitter2 from "eventemitter2"
import superjson from "@/modules/superjson"
import { ChainId, Network } from "@/modules/types"
// declare core socket io event emitter
export const coreSocketIoEventEmitter = new EventEmitter2()

// declare core socket io event
export enum CoreSocketIoEvent {
    LiquidityPoolsFetched = "liquidity_pools_fetched",
}


export interface LiquidityPoolsFetchedEvent {
    chainId: ChainId
    network: Network
    pools: string // serialized
}

export const useCoreSocketIo = () => {
    // create socket io client
    const socketRef = useRef(createManager().socket("/core"))
    const totpVerified = useAppSelector((state) => state.session.totpVerified)

    // on socket io connect
    useEffect(() => {
        const socket = socketRef.current
        // on connect
        socket.on("connect", () => {
            console.log(`[Core Socket] Connected — ID: ${socket.id}`)
        })
        // on pyth prices updated
        socket.on("liquidity_pools_fetched", (data) => {
            coreSocketIoEventEmitter.emit(CoreSocketIoEvent.LiquidityPoolsFetched, data)
        })
        // on disconnect
        socket.on("disconnect", (reason) => {
            console.log(`[Core Socket] Disconnected — reason: ${reason}`)
        })
        // on connect error
        socket.on("connect_error", (err) => {
            console.error("[Core Socket] Connection error:", err.message)
        })
        return () => {
            socket.off("connect")
            socket.off("disconnect")
            socket.off("connect_error")
        }
    }, [])

    // if totp is verified, connect to socket io
    useEffect(() => {
        if (!totpVerified) {
            return
        }
        const socket = socketRef.current
        // set auth token
        socket.auth = {
            token: new SessionStorage().getItem(SessionStorageKey.AccessToken),
        }
        socket.connect()
    }, [totpVerified])

    const tokenPrices = useAppSelector((state) => state.socket.tokenPrices)
    const dispatch = useAppDispatch()
    // on price update

    useEffect(() => {
        const callback = (data: LiquidityPoolsFetchedEvent) => {
            const { pools } = superjson.parse<LiquidityPoolsFetchedEvent>(data.pools)
            console.log(pools)
        }
        coreSocketIoEventEmitter.on(CoreSocketIoEvent.LiquidityPoolsFetched, callback)
        return () => {
            coreSocketIoEventEmitter.off(CoreSocketIoEvent.LiquidityPoolsFetched, callback)
        }
    }, [tokenPrices])

    return socketRef.current
}