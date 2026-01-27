import { KaniDropdown, KaniDropdownItem, KaniDropdownMenu, KaniDropdownTrigger, KaniLink } from "@/components/atomic"
import { BotSchema, PerformanceDisplayMode } from "@/modules/types"
import { useAppSelector } from "@/redux"
import React, { useMemo, useState } from "react"
import { CaretRotateIcon } from "@/components/reuseable"
import { useUpdateBotPerformanceDisplayModeV2SwrMutation } from "@/hooks/singleton"

interface UnitDropdownProps {
    bot: BotSchema
}

export const UnitDropdown = ({ bot }: UnitDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const tokens = useAppSelector(
        (state) => state.static.tokens
    )
    const targetToken = useMemo(
        () => tokens?.find((token) => token.id === bot?.targetToken), [tokens, bot?.targetToken]
    )
    const performanceDisplayMode = useMemo(() => bot?.performanceDisplayMode, [bot?.performanceDisplayMode])
    const updateBotPerformanceDisplayModeV2SwrMutation = useUpdateBotPerformanceDisplayModeV2SwrMutation()
    return (
        <KaniDropdown isOpen={isOpen} onOpenChange={setIsOpen}>
            <KaniDropdownTrigger>
                <KaniLink
                    className="text-sm text-foreground-500"
                >
                    <div className="flex items-center gap-2">
                        {performanceDisplayMode === PerformanceDisplayMode.Usd ? "USD" : targetToken?.symbol}
                        <CaretRotateIcon isUp={isOpen} classNames={{ icon: "w-[14px] h-[14px]" }} />
                    </div>
                </KaniLink> 
            </KaniDropdownTrigger>
            <KaniDropdownMenu 
                selectionMode="single" 
                selectedKeys={[performanceDisplayMode]} 
                onSelectionChange={
                    async (value) => {
                        if (value === "all") {
                            return
                        }
                        const selectedKeys = Array.from(value)
                        await updateBotPerformanceDisplayModeV2SwrMutation.trigger({
                            request: {
                                id: bot.id,
                                performanceDisplayMode: selectedKeys[0] as unknown as PerformanceDisplayMode,
                            },
                        })
                    }}>
                <KaniDropdownItem key={PerformanceDisplayMode.Target}>
                    {targetToken?.symbol}
                </KaniDropdownItem>
                <KaniDropdownItem key={PerformanceDisplayMode.Usd}>
                    USD
                </KaniDropdownItem>
            </KaniDropdownMenu>
        </KaniDropdown>
    )
}