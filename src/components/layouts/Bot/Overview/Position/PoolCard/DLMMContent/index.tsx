import React from "react"
import { Spacer } from "@heroui/react"
import { Chart } from "./Chart"
import { Yield } from "./Yield"
import { Liquidity } from "./Liquidity"

export const DLMMContent = () => {
    return (
        <>
            <Chart />
            <Spacer y={6} />
            <div className="flex flex-col gap-3">
                <Yield />
                <Liquidity />
            </div>
        </>
    )
}
