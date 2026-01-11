import React from "react"  
import { Spacer } from "@heroui/react"
import { Account } from "./Account"
import { Pools } from "./Pools"

export const Wallet = () => {
    return (
        <div>
            <Account />
            <Spacer y={4} />
            <Pools />
        </div>
    )
}