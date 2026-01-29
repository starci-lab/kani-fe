import { KaniDropdown, KaniDropdownItem, KaniDropdownMenu, KaniDropdownTrigger, KaniLink } from "../../atomic"
import { PerformanceDisplayMode, TokenSchema } from "@/modules/types"
import React, { useState } from "react"
import { CaretRotateIcon } from "../CaretRotateIcon"
import { WithClassNames } from "../../types"
import { cn } from "@heroui/react"

interface UnitDropdownProps extends WithClassNames<{
    trigger?: string
}> {
    targetToken: TokenSchema
    value: PerformanceDisplayMode
    onValueChange: (value: PerformanceDisplayMode) => void
}

export const UnitDropdown = ({ targetToken, value, onValueChange, classNames }: UnitDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <KaniDropdown isOpen={isOpen} onOpenChange={setIsOpen}>
            <KaniDropdownTrigger>
                <KaniLink
                    className={cn("text-sm text-foreground-500", classNames?.trigger)}
                >
                    <div className="flex items-center gap-2">
                        {value === PerformanceDisplayMode.Usd ? "USD" : targetToken?.symbol}
                        <CaretRotateIcon isUp={isOpen} classNames={{ icon: "w-[14px] h-[14px]" }} />
                    </div>
                </KaniLink> 
            </KaniDropdownTrigger>
            <KaniDropdownMenu 
                selectionMode="single" 
                selectedKeys={[value]} 
                onSelectionChange={
                    async (value) => {
                        if (value === "all") {
                            return
                        }
                        const selectedKeys = Array.from(value)
                        onValueChange(selectedKeys[0] as PerformanceDisplayMode)
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