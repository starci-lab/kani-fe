import { Logo } from "@/components/svg"
import React from "react"

export interface EmptyContentProps {
    title?: string
    description: string
}
export const EmptyContent = ({ title = "No results found", description }: EmptyContentProps) => {
    return (
        <div className="grid place-items-center py-6">
            <div className="flex items-center gap-4">
                <Logo className="w-30 h-30 text-foreground-300" />
                <div>
                    <div>{title}</div>
                    <div className="text-sm text-foreground-500">{description}</div>
                </div>
            </div>
        </div>
    )
}