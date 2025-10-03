import React from "react"

import { KaniTooltip } from "../../atomic"
import { WithClassNames } from "@/components/types"
import { cn } from "@heroui/react"

export interface TooltipTitleProps extends WithClassNames<{
    title: string
    tooltipString?: string
}> {
    title: string
    tooltipString?: string
}

export const TooltipTitle = ({ title, tooltipString, classNames }: TooltipTitleProps) => {
    return (
        <>
        {tooltipString ? (
            <KaniTooltip content={cn(tooltipString, classNames?.tooltipString)}>
                <div className={cn("text-sm", classNames?.title)}>
                    {title}
                </div>
            </KaniTooltip>
        ) : (
            <div className={cn("text-sm", classNames?.title)}>
                {title}
            </div>
        )}
        </>
    )
}
