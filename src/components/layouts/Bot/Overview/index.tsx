import React from "react"
import { Spacer } from "@heroui/react"
import { Investment } from "./Investment"
import { Position } from "./Position"

export const Overview = () => {
    return (
        <>
            <Investment />
            <Spacer y={6} />
            <Position />
        </>
    )
}