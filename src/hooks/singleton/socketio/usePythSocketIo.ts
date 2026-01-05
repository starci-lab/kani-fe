import { useRef, useEffect } from "react"
import { createManager } from "./utils"
import { useAppSelector, useAppDispatch, setTokenPrice } from "@/redux"
import EventEmitter2 from "eventemitter2"
import { TokenId } from "@/modules/types"
import superjson from "@/modules/superjson"

// declare pyth socket io event emitter
export const pythSocketIoEventEmitter = new EventEmitter2()

// declare pyth socket io event
export enum PythSocketIoEvent {
    PythPricesUpdated = "pyth_prices_updated",
}
// declare pyth prices updated event
export interface PythPricesUpdatedEvent {
    prices: Array<PythPriceUpdated>
}

export interface PythPriceUpdated {
    tokenId: TokenId
    price: number
}

export const usePythSocketIo = () => {
    // create socket io client
    const socketRef = useRef(createManager().socket("/pyth"))

    // on socket io connect
    useEffect(() => {
        const socket = socketRef.current
        // on connect
        socket.on("connect", () => {
            console.log(`[Pyth Socket] Connected — ID: ${socket.id}`)
        })
        // on pyth prices updated
        socket.on<string>("pyth_prices_updated", (data) => {
            const event = superjson.parse<PythPricesUpdatedEvent>(data)
            pythSocketIoEventEmitter.emit(PythSocketIoEvent.PythPricesUpdated, event)
        })
        // on disconnect
        socket.on("disconnect", (reason) => {
            console.log(`[Pyth Socket] Disconnected — reason: ${reason}`)
        })
        // on connect error
        socket.on("connect_error", (err) => {
            console.error("[Pyth Socket] Connection error:", err.message)
        })
        return () => {
            socket.off("connect")
            socket.off("disconnect")
            socket.off("connect_error")
        }
    }, [])

    const accessToken = useAppSelector((state) => state.session.accessToken)

    // if totp is verified, connect to socket io
    useEffect(() => {
        if (!accessToken) {
            return
        }
        const socket = socketRef.current
        // set auth token
        socket.auth = {
            token: accessToken,
        }
        socket.connect()
    }, [accessToken])

    const tokenPrices = useAppSelector((state) => state.socket.tokenPrices)
    const dispatch = useAppDispatch()
    // on price update
    useEffect(() => {
        const callback = (
            data: PythPricesUpdatedEvent
        ) => {
            for (const price of data.prices) {
                console.log("price", price)
                dispatch(setTokenPrice({
                    tokenId: price.tokenId,
                    price: price.price,
                }))
            }
        }
        pythSocketIoEventEmitter.on(
            PythSocketIoEvent.PythPricesUpdated, 
            callback
        )
        return () => {
            pythSocketIoEventEmitter.off(
                PythSocketIoEvent.PythPricesUpdated, 
                callback
            )
        }
    }, [tokenPrices, dispatch])

    return socketRef.current
}