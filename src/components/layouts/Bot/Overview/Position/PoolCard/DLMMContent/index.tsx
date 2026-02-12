import React from "react"
import { Spacer } from "@heroui/react"
import { Chart } from "./Chart"
import { Liquidity } from "./Liquidity"
import { Fees } from "./Fees"
import { Rewards } from "./Rewards"

export const DLMMContent = () => {
    return (
        <>
            <Chart />
            <Spacer y={6} />
            <div className="flex flex-col gap-3">
                <Liquidity />
                <Fees />
                <Rewards />
            </div>
        </>
    )
}
