import React from "react"  
import { Spacer } from "@heroui/react"
import { Account } from "./Account"
import { Pools } from "./Pools"

export const Portfolio = () => {
    return (
        <div>
            <Account />
            <Spacer y={8} />
            <Pools />
        </div>
    )
}