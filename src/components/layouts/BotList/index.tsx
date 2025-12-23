import React from "react"
import { DisplayModeToggle } from "./DisplayModeToggle"
import { BotNotFound } from "./BotNotFound"
import { Spacer } from "@heroui/react"
import { Bots } from "./Bots"
import { useQueryBots2Swr } from "@/hooks/singleton"
import { BotsSkeleton } from "./BotsSkeleton"
import { useAppSelector } from "@/redux"
export const BotList = () => {
    const swr = useQueryBots2Swr()
    const bots = useAppSelector((state) => state.bot.bots)
    // render bots based on the display mode
    const renderBots = () => {
        if (swr.isLoading) {
            return <BotsSkeleton/>
        }
        if (!bots?.length) {
            return <BotNotFound/>
        }
        return <Bots/>
    }
    return (
        <div>
            <div className="flex flex-row-reverse">
                <DisplayModeToggle/>
            </div>
            <Spacer y={6}/>   
            {renderBots()}
        </div>
    )
}