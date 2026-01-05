import React from "react"
import { useSelectPools } from "./useSelectPools"
import { useAuth } from "./useAuth"
import { useRedirect } from "./useRedirect"

export const DepsWorker = () => {
    useSelectPools()
    useAuth()
    useRedirect()
    return (
        <></>
    )
}