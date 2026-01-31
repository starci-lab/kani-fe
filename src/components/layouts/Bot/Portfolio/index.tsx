import React from "react"  
import { Spacer } from "@heroui/react"
import { Account } from "./Account"
import { Pools } from "./Pools"
import { Tokens } from "./Tokens"

export const Portfolio = () => {
    return (
        <div>
            <Account />
            <Spacer y={6} />
            <Tokens />
            <Spacer y={6} />
            <Pools />
        </div>
    )
}