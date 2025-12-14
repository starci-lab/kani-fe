import React from "react"
import { useSelectPools } from "./useSelectPools"
import { useAuth } from "./useAuth"
import { useQueryBot } from "./useQueryBot"

export const DepsWorker = () => {
    useSelectPools()
    useAuth()
    useQueryBot()
    return (
        <></>
    )
}