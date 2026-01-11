import React from "react"
import { Spacer } from "@heroui/react"
import { Transactions } from "./Transactions"
import { Positions } from "./Positions"

export const Activity = () => {
    return (
        <>
            <Transactions />
            <Spacer y={8} />
            <Positions />
        </>
    )
}