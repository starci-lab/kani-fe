import React from "react"
import { KaniTab, KaniTabs } from "@/components/atomic"
import { ListIcon, GridFourIcon } from "@phosphor-icons/react"
import { BotDisplayMode, setDisplayMode, useAppSelector } from "@/redux"
import { useAppDispatch } from "@/redux"

export interface DisplayModeToggleTab {
    key: string
    text: string
    icon: React.ElementType
    ariaLabel: string
}
export const DisplayModeToggle = () => {
    const displayMode = useAppSelector(state => state.bot.displayMode)
    const dispatch = useAppDispatch()
    const tabs: Array<DisplayModeToggleTab> = [
        {
            ariaLabel: "Grid",
            key: BotDisplayMode.Grid,
            text: "Grid",
            icon: GridFourIcon,
        },
        {
            ariaLabel: "List",
            key: BotDisplayMode.List,
            text: "List",
            icon: ListIcon,
        }
    ]
    return (
        <KaniTabs 
            color="secondary"
            classNames={{
                cursor: "group-data-[selected=true]:bg-secondary/20",
                tabContent: "group-data-[selected=true]:text-secondary"
            }}
            selectedKey={displayMode} 
            onSelectionChange={(value) => {
                dispatch(setDisplayMode(value as BotDisplayMode))
            }}>
            {tabs.map((tab) => (
                <KaniTab aria-label={tab.ariaLabel} key={tab.key} title={
                    <div className="flex items-center gap-2">
                        <tab.icon className="min-size-5 w-5 h-5" />
                        {tab.text}
                    </div>
                }/>
            ))}
        </KaniTabs>
    )
}