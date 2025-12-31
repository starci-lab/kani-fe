import React from "react"
import { useSelectPools } from "./useSelectPools"
import { useAuth } from "./useAuth"
import { useQueryBot } from "./useQueryBot"
import { useRedirect } from "./useRedirect"

export const DepsWorker = () => {
    useSelectPools()
    useAuth()
    useQueryBot()
    useRedirect()
    return (
        <></>
    )
}