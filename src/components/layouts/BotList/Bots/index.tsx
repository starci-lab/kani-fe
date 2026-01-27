import React from "react"
import { BotDisplayMode, useAppSelector } from "@/redux"
import { BotCard } from "./BotCard"

export const Bots = () => {
    const bots = useAppSelector((state) => state.bot.bots)
    const displayMode = useAppSelector((state) => state.bot.displayMode)
    return (
        <>
            {displayMode === BotDisplayMode.Grid ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {bots?.map((bot) => (
                            <BotCard key={bot.id} bot={bot} />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col gap-4">
                        {bots?.map((bot) => (
                            <BotCard key={bot.id} bot={bot} />
                        ))}
                    </div>
                </>
            )}
        </>
    )
}