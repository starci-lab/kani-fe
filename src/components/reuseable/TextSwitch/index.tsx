import React from "react"
import { KaniSwitch } from "../../atomic"
export interface TextSwitchProps {
    text: string
    isSelected: boolean
    onValueChange: (value: boolean) => void
}
export const TextSwitch = ({ text, isSelected, onValueChange }: TextSwitchProps) => {
    return (
        <div className="flex justify-center items-center gap-2">
            <div className="text-xs text-foreground-500">{text}</div>
            <KaniSwitch classNames={{
                wrapper: "h-5 w-8 p-[2px]",
                thumb: "h-4 w-4 group-data-[selected=true]:ms-3",
            }} color="secondary" size="sm" isSelected={isSelected} onValueChange={onValueChange} />
        </div>
    )
}