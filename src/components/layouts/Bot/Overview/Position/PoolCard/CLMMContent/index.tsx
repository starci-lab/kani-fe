import React from "react"
import { Spacer } from "@heroui/react"
import { Chart } from "./Chart"
import { Reserves } from "./Reserves"
import { Fees } from "./Fees"
import { Rewards } from "./Rewards"
import { Performance } from "./Performance"

export const CLMMContent = () => {
    return (
        <>
            <Chart />
            <Spacer y={6} />
            <div className="flex flex-col gap-3">
                <Reserves />
                <Fees />
                <Rewards />
                <Performance />
            </div>
        </>
    )
}
