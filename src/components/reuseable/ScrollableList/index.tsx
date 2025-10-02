import React from "react"

export interface ScrollableListProps<T> {
    items: Array<T>
    renderItem: (item: T) => React.ReactNode
}
export const ScrollableList = <T,>({ items, renderItem }: ScrollableListProps<T>) => {
    return <div>
        {items.map(renderItem)}
    </div>
}
