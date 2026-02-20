import React from "react"
import { Spacer } from "@heroui/react"
import { Chart } from "./Chart"
import { Fees } from "./Fees"
import { Rewards } from "./Rewards"
import { Reserves } from "./Reserves"
import { Performance } from "./Performance"

export const DLMMContent = () => {
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
