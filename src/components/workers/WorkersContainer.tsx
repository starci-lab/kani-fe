import React from "react"
import { PrivyWorker } from "./privy"
import { DepsWorker } from "./deps"

export const WorkersContainer = () => {
    return (
        <>
            <PrivyWorker />
            <DepsWorker />
        </>
    )
}