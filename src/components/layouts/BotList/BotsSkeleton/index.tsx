import React from "react"
import { BotDisplayMode, useAppSelector } from "@/redux"
import { Grid } from "./Grid"
import { List } from "./List"

export const BotsSkeleton = () => {
    const displayMode = useAppSelector((state) => state.bot.displayMode)
    return (
        <>
            {displayMode === BotDisplayMode.Grid ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Grid key={index} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <List key={index} />
                    ))}
                </div>
            )}
        </>
    )
}