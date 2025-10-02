"use client"
import React, { PropsWithChildren } from "react"
import { DiscloresureProvider } from "./discloresure"
import { SwrProvider } from "./swr"
import { FormikProvider } from "./formik"
import { SocketIoProvider } from "./socketio"

export const SingletonHookProvider = ({ children }: PropsWithChildren) => {
    return (
        <DiscloresureProvider>
            <SwrProvider>
                <FormikProvider>
                    <SocketIoProvider>
                        {children}
                    </SocketIoProvider>
                </FormikProvider>
            </SwrProvider>
        </DiscloresureProvider>
    )
}   