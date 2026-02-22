"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { useDynamicLiquidityPoolInfoSocketIo } from "./useDynamicLiquidityPoolInfoSocketIo"
import { usePriceSocketIo } from "./usePriceSocketIo"
import { useCallbackSocketIo } from "./useCallbackSocketIo"

export interface SocketIoContextType {
    dynamicLiquidityPoolInfoSocketIo: ReturnType<typeof useDynamicLiquidityPoolInfoSocketIo>
    priceSocketIo: ReturnType<typeof usePriceSocketIo>
    callbackSocketIo: ReturnType<typeof useCallbackSocketIo>
}

export const SocketIoContext = createContext<SocketIoContextType | null>(null)

export const SocketIoProvider = ({ children }: PropsWithChildren) => {
    const dynamicLiquidityPoolInfoSocketIo = useDynamicLiquidityPoolInfoSocketIo()
    const priceSocketIo = usePriceSocketIo()
    const callbackSocketIo = useCallbackSocketIo()
    return (
        <SocketIoContext.Provider value={
            { 
                dynamicLiquidityPoolInfoSocketIo, 
                priceSocketIo,
                callbackSocketIo,
            }
        }>
            {children}
        </SocketIoContext.Provider>
    )
}