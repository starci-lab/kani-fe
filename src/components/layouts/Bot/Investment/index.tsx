import React from "react"
import { Spacer } from "@heroui/react"
import { Investment as InvestmentComponent } from "./Investment"
import { Position } from "./Position"

export const Investment = () => {
    return (
        <>
            <InvestmentComponent />
            <Spacer y={4} />
            <Position />
        </>
    )
}