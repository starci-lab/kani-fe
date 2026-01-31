import React from "react"
import { Spacer } from "@heroui/react"
import { Transactions } from "./Transactions"
import { Positions } from "./Positions"

export const Activity = () => {
    return (
        <div className="w-full">
            <Transactions />
            <Spacer y={6} />   
            <Positions />
        </div>
    )
}