"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { useQueryUserSwrMutationCore, useQueryUserWithoutRetrySwrMutationCore } from "./api/graphql/query"

export interface SwrContextType {
    queryUserMutation: ReturnType<typeof useQueryUserSwrMutationCore>
    queryUserWithoutRetryMutation: ReturnType<typeof useQueryUserWithoutRetrySwrMutationCore>
}

export const SwrContext = createContext<SwrContextType | null>(null)

export const SwrProvider = ({ children }: PropsWithChildren) => {
    const queryUserMutation = useQueryUserSwrMutationCore()
    const queryUserWithoutRetryMutation = useQueryUserWithoutRetrySwrMutationCore()
    return (
        <SwrContext.Provider value={{ queryUserMutation, queryUserWithoutRetryMutation }}>
            {children}
        </SwrContext.Provider>
    )
}