import React from "react"
import { useAuth } from "./useAuth"
import { useRedirect } from "./useRedirect"

export const DepsWorker = () => {
    useAuth()
    useRedirect()
    return (
        <></>
    )
}