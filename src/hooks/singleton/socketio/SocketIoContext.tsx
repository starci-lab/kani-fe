"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { useDynamicLiquidityPoolInfoSocketIo } from "./useDynamicLiquidityPoolInfoSocketIo"
import { usePriceSocketIo } from "./usePriceSocketIo"

export interface SocketIoContextType {
    dynamicLiquidityPoolInfoSocketIo: ReturnType<typeof useDynamicLiquidityPoolInfoSocketIo>
    priceSocketIo: ReturnType<typeof usePriceSocketIo>
}

export const SocketIoContext = createContext<SocketIoContextType | null>(null)

export const SocketIoProvider = ({ children }: PropsWithChildren) => {
    const dynamicLiquidityPoolInfoSocketIo = useDynamicLiquidityPoolInfoSocketIo()
    const priceSocketIo = usePriceSocketIo()
    return (
        <SocketIoContext.Provider value={
            { 
                dynamicLiquidityPoolInfoSocketIo, 
                priceSocketIo 
            }
        }>
            {children}
        </SocketIoContext.Provider>
    )
}