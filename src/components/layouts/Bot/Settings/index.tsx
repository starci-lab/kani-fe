import React from "react"
import { Name } from "./Name"
import { ExitToUsdc } from "./ExitToUsdc"
import { Spacer } from "@heroui/react"
import { Pools } from "./Pools"
import { WithdrawalAddress } from "./WithdrawalAddress"

export const Settings = () => {
    return (
        <div>
            <Name />
            <Spacer y={6} />
            <Pools />
            <Spacer y={6} />
            <ExitToUsdc />
            <Spacer y={6} />
            <WithdrawalAddress />
        </div>
    )
}