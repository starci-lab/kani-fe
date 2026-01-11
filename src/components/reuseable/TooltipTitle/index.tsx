import React from "react"

import { KaniTooltip } from "../../atomic"
import { WithClassNames } from "@/components/types"
import { cn } from "@heroui/react"
import { QuestionIcon } from "@phosphor-icons/react"


export interface TooltipTitleProps extends WithClassNames<{
    title: string
    tooltipString?: string
    questionMarkIconClassName?: string
}> {
    isRequired?: boolean
    title: string
    tooltipString?: string
    showQuestionMark?: boolean
}

export const TooltipTitle = ({ 
    title, tooltipString, 
    classNames, 
    isRequired, 
    showQuestionMark = false 
}: TooltipTitleProps) => {
    const renderContent = () => {
        return (
            <div className="flex items-center gap-1">
                <div className={cn("text-sm w-fit", classNames?.title)}>
                    {title} {isRequired && <span className="text-danger">*</span>}
                </div>
                {
                showQuestionMark && <QuestionIcon className={
                    cn(
                        "w-5 h-5 text-foreground-500", 
                    classNames?.questionMarkIconClassName
                    )
                }/>
                }
            </div>
        )
    }
    return (
        <>
        {tooltipString ? (
            <KaniTooltip 
            content={
                cn(tooltipString, classNames?.tooltipString)
            }
            >
                {renderContent()}
            </KaniTooltip>
        ) : (
            renderContent()
        )}
        </>
    )
}
