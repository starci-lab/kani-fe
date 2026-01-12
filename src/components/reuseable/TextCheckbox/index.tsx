import React from "react"
import { KaniCheckbox } from "../../atomic"
export interface TextCheckboxProps {
    text: string
    isSelected: boolean
    onValueChange: (value: boolean) => void
}
export const TextCheckbox = ({ text, isSelected, onValueChange }: TextCheckboxProps) => {
    return (
        <div className="flex justify-center items-center gap-2">
            <KaniCheckbox color="secondary" isSelected={isSelected} onValueChange={onValueChange} />
            <div className="text-xs text-foreground-500">{text}</div>
        </div>
    )
}