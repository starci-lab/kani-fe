"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { useDynamicLiquidityPoolInfoSocketIo } from "./useDynamicLiquidityPoolInfoSocketIo"
import { usePriceSocketIo } from "./usePriceSocketIo"
import { useCallbackSocketIo } from "./useCallbackSocketIo"
import { useIndicatorsSocketIo } from "./useIndicatorsSocketIo"

export interface SocketIoContextType {
    dynamicLiquidityPoolInfoSocketIo: ReturnType<typeof useDynamicLiquidityPoolInfoSocketIo>
    priceSocketIo: ReturnType<typeof usePriceSocketIo>
    callbackSocketIo: ReturnType<typeof useCallbackSocketIo>
    indicatorsSocketIo: ReturnType<typeof useIndicatorsSocketIo>
}

export const SocketIoContext = createContext<SocketIoContextType | null>(null)

export const SocketIoProvider = ({ children }: PropsWithChildren) => {
    const dynamicLiquidityPoolInfoSocketIo = useDynamicLiquidityPoolInfoSocketIo()
    const priceSocketIo = usePriceSocketIo()
    const callbackSocketIo = useCallbackSocketIo()  
    const indicatorsSocketIo = useIndicatorsSocketIo()
    return (
        <SocketIoContext.Provider value={
            { 
                dynamicLiquidityPoolInfoSocketIo, 
                priceSocketIo,
                callbackSocketIo,
                indicatorsSocketIo,
            }
        }>
            {children}
        </SocketIoContext.Provider>
    )
}