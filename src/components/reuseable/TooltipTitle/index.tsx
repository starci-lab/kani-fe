import React from "react"

import { KaniTooltip } from "../../atomic"

export interface TooltipTitleProps {
    title: string
    tooltipString?: string
}

export const TooltipTitle = ({ title, tooltipString }: TooltipTitleProps) => {
    return (
        <>
        {tooltipString ? (
            <KaniTooltip content={tooltipString}>
                {title}
            </KaniTooltip>
        ) : (
            {title}
        )}
        </>
    )
}
