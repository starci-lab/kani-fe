import React from "react"
import { Name } from "./Name"
import { ExitToUsdc } from "./ExitToUsdc"
import { Spacer } from "@heroui/react"

export const Settings = () => {
    return (
        <div>
            <Name />
            <Spacer y={8} />
            <ExitToUsdc />
        </div>
    )
}