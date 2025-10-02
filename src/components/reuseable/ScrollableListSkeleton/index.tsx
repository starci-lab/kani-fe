"use client"
import { Skeleton, cn } from "@heroui/react"
import React from "react"
import { WithClassNames } from "../../types"

export type ScrollableListSkeletonProps = WithClassNames<{
    skeleton?: string
}>

export const ScrollableListSkeleton = ({ classNames }: ScrollableListSkeletonProps  ) => {
    return <div className="relative p-4 h-[300px] gap-2 flex flex-col">
        <Skeleton className={cn(classNames?.skeleton, "w-full h-[97px] rounded-medium")} />
        <Skeleton className={cn(classNames?.skeleton, "w-full h-[97px] rounded-medium")} />
        <Skeleton className={cn(classNames?.skeleton, "w-full h-[97px] rounded-medium")} />
    </div>
}
