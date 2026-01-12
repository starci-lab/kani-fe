import { cn, ScrollShadow } from "@heroui/react"
import React from "react"
import { WithClassNames } from "../../types"

export interface ScrollableListProps<T>
  extends WithClassNames<{
    scrollShadow?: string;
  }> {
  items: Array<T>;
  renderItem: (item: T) => React.ReactNode;
  enableScroll?: boolean;
}
export const ScrollableList = <T,>({
    items,
    renderItem,
    enableScroll = true,
    className,
    classNames,
}: ScrollableListProps<T>) => {
    // we render the list without scroll if enableScroll is false
    if (!enableScroll) {
        return (
            <div className={`relative gap-3 flex flex-col ${className}`}>
                {items.map(renderItem)}
            </div>
        )
    }
    // we render the list with scroll if enableScroll is true
    return (
        <div className={`relative ${className}`}>
            <ScrollShadow className={cn("max-h-[300px]", classNames?.scrollShadow)}>
                <div className="gap-3 flex flex-col">{items.map(renderItem)}</div>
            </ScrollShadow>
        </div>
    )
}
