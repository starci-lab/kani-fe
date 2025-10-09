import { WarningIcon } from "@phosphor-icons/react"
import React from "react"

export const WarningText = ({ text }: WarningTextProps) => {
    return <div className="flex items-center gap-2">
        <div className="text-warning">
            <WarningIcon className="w-5 h-5" />
        </div>
        <div className="text-warning text-sm">{text}</div>
    </div>
}

export interface WarningTextProps {
    text: string
}