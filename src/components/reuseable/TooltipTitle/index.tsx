import React from "react"

import { KaniTooltip } from "../../atomic"
import { WithClassNames } from "@/components/types"
import { cn } from "@heroui/react"


export interface TooltipTitleProps extends WithClassNames<{
    title: string
    tooltipString?: string
}> {
    isRequired?: boolean
    title: string
    tooltipString?: string
}

export const TooltipTitle = ({ title, tooltipString, classNames, isRequired }: TooltipTitleProps) => {
    return (
        <>
        {tooltipString ? (
            <KaniTooltip content={cn(tooltipString, classNames?.tooltipString)}>
                <div className={cn("text-sm w-fit", classNames?.title)}>
                    {title} {isRequired && <span className="text-danger">*</span>}
                </div>
            </KaniTooltip>
        ) : (
            <div className={cn("text-sm text-foreground-500", classNames?.title)}>
                {title}
            </div>
        )}
        </>
    )
}
