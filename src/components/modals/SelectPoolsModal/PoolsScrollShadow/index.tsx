import React from "react"
import { useAppSelector } from "@/redux"
import { 
    PoolCard, 
    ScrollableList, 
    ScrollableListSkeleton 
} from "@/components/reuseable"
import { useQueryStaticSwrMutation } from "@/hooks/singleton"

export const PoolsScrollShadow = () => {
    const queryStaticSwrMutation = useQueryStaticSwrMutation()
    const liquidityPools = useAppSelector((state) => state.static.liquidityPools)
    return (
        <>
            {queryStaticSwrMutation.isLoading ? (
                <ScrollableListSkeleton/>
            ) : (
                <ScrollableList
                    enableScroll={true}
                    items={liquidityPools}
                    renderItem={
                        (liquidityPool) => (
                        <PoolCard 
                            key={liquidityPool.id} 
                            liquidityPool={liquidityPool} 
                        />
                    )}
                />
            )}
        </>
    )
}
