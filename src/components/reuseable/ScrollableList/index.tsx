import { ScrollShadow } from "@heroui/react"
import React from "react"

export interface ScrollableListProps<T> {
    items: Array<T>
    renderItem: (item: T) => React.ReactNode
}
export const ScrollableList = <T,>({ items, renderItem }: ScrollableListProps<T>) => {
    return <div className="relative">
        <ScrollShadow className="max-h-[300px] p-4 gap-2 flex flex-col">
            {items.map(renderItem)}
        </ScrollShadow>
    </div>
}
