import React from "react"
import { Spacer } from "@heroui/react"
import { Investment } from "./Investment"
import { Position } from "./Position"
import { Indicators } from "./Indicators"

export const Overview = () => {
    return (
        <>
            <Investment />
            <Spacer y={6} />
            <Position />
            <Spacer y={6} />
            <Indicators />
        </>
    )
}