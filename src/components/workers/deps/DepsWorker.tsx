import React from "react"
import { useRedirect } from "./useRedirect"
import { useBot } from "./useBot"
import { useAuth } from "./useAuth"

export const DepsWorker = () => {
    useRedirect()
    useBot()
    useAuth()
    return (
        <></>
    )
}