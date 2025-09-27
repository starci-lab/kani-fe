"use client"
import React, { PropsWithChildren } from "react"
import { DiscloresureProvider } from "./discloresure"

export const SingletonHookProvider = ({ children }: PropsWithChildren) => {
    return (
        <DiscloresureProvider>
            {children}
        </DiscloresureProvider>
    )
}   