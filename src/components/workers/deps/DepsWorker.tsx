import React from "react"
import { useSelectPools } from "./useSelectPools"
import { useAuth } from "./useAuth"

export const DepsWorker = () => {
    useSelectPools()
    useAuth()
    return (
        <></>
    )
}