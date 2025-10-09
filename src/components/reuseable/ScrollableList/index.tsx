import { ScrollShadow } from "@heroui/react"
import React from "react"

export interface ScrollableListProps<T> {
    items: Array<T>
    renderItem: (item: T) => React.ReactNode
    enableScroll?: boolean
}
export const ScrollableList = <T,>({ items, renderItem, enableScroll = true }: ScrollableListProps<T>) => {
    // we render the list without scroll if enableScroll is false
    if (!enableScroll) {
        return (
            <div className="relative gap-2 flex flex-col">
                {items.map(renderItem)}
            </div>
        )
    }
    // we render the list with scroll if enableScroll is true
    return <div className="relative">
        <ScrollShadow className="max-h-[300px] p-4 gap-2 flex flex-col">
            {items.map(renderItem)}
        </ScrollShadow>
    </div>
}
