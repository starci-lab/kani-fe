import { KaniLink, KaniSnippet } from "@/components"
import { centerPad } from "@/modules/utils"
import React from "react"

export interface XsSnippetProps {
    text: string
}

// XsSnippet is a snippet of text that is displayed in a small box
export const XsSnippet = ({ text }: XsSnippetProps) => {
    return (
        <div className="bg-content2 w-fit py-1 px-1.5 rounded-medium flex items-center gap-1">
            <KaniLink color="foreground" className="text-xs text-foreground-500">{
                centerPad(
                    text ?? "",
                    6, 4)
            }</KaniLink>
            <KaniSnippet value={text ?? ""} classNames={{ icon: "w-4 h-4" }} />
        </div>
    )
}