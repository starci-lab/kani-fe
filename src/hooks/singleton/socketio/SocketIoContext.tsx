"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { usePythSocketIo } from "./usePythSocketIo"
import { useCoreSocketIo } from "./useCoreSocketIo"

export interface SocketIoContextType {
    pythSocketIo: ReturnType<typeof usePythSocketIo>
    coreSocketIo: ReturnType<typeof useCoreSocketIo>
}

export const SocketIoContext = createContext<SocketIoContextType | null>(null)

export const SocketIoProvider = ({ children }: PropsWithChildren) => {
    const pythSocketIo = usePythSocketIo()
    const coreSocketIo = useCoreSocketIo()
    return (
        <SocketIoContext.Provider value={{ pythSocketIo, coreSocketIo }}>
            {children}
        </SocketIoContext.Provider>
    )
}