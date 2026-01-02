import React from "react"
import { useAppSelector } from "@/redux"
import { BotCard } from "./BotCard"

export const Bots = () => {
    const bots = useAppSelector((state) => state.bot.bots)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bots?.map((bot) => (
                <BotCard key={bot.id} bot={bot} />
            ))}
        </div>
    )
}