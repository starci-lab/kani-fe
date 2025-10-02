"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { usePythSocketIo } from "./usePythSocketIo"

export interface SocketIoContextType {
    pythSocketIo: ReturnType<typeof usePythSocketIo>
}

export const SocketIoContext = createContext<SocketIoContextType | null>(null)

export const SocketIoProvider = ({ children }: PropsWithChildren) => {
    const pythSocketIo = usePythSocketIo()
    return (
        <SocketIoContext.Provider value={{ pythSocketIo }}>
            {children}
        </SocketIoContext.Provider>
    )
}