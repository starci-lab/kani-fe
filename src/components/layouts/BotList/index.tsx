import React from "react"
import { DisplayModeToggle } from "./DisplayModeToggle"
import { BotNotFound } from "./BotNotFound"
import { Spacer } from "@heroui/react"

export const BotList = () => {
    return (
        <div>
            <div className="flex flex-row-reverse">
                <DisplayModeToggle/>
            </div>
            <Spacer y={6}/>
            <BotNotFound/>
        </div>
    )
}