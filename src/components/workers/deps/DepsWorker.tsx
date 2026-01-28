import React from "react"
import { useAuth } from "./useAuth"
import { useRedirect } from "./useRedirect"
import { useBot } from "./useBot"

export const DepsWorker = () => {
    useAuth()
    useRedirect()
    useBot()
    return (
        <></>
    )
}