import React, { useMemo } from "react"
import { useAppSelector } from "@/redux"
import { 
    PoolCard, 
    ScrollableList, 
    ScrollableListSkeleton 
} from "@/components/reuseable"
import { useCreateBotFormik, useQueryStaticSwrMutation } from "@/hooks/singleton"

export const PoolsScrollShadow = () => {
    const queryStaticSwrMutation = useQueryStaticSwrMutation()
    const liquidityPools = useAppSelector((state) => state.static.liquidityPools)
    const formik = useCreateBotFormik()
    const tokens = useAppSelector((state) => state.static.tokens)
    const filteredLiquidityPools = useMemo(() => {
        return liquidityPools.filter(
            (liquidityPool) => {
                const targetToken = tokens.find((token) => token.displayId === formik.values.targetTokenId)
                const quoteToken = tokens.find((token) => token.displayId === formik.values.quoteTokenId)
                if (!targetToken || !quoteToken) {
                    return []
                }
                const targetTokenId = targetToken.id
                const quoteTokenId = quoteToken.id
                const isPair = liquidityPool.tokenA === targetTokenId && liquidityPool.tokenB === quoteTokenId
                || liquidityPool.tokenA === quoteTokenId && liquidityPool.tokenB === targetTokenId
                return isPair && liquidityPool.chainId === formik.values.chainId
            }
        )
    }, [
        liquidityPools, 
        formik.values.chainId, 
        formik.values.targetTokenId, 
        formik.values.quoteTokenId
    ])
    return (
        <>
            {queryStaticSwrMutation.isLoading ? (
                <ScrollableListSkeleton/>
            ) : (
                <ScrollableList
                    enableScroll={true}
                    items={filteredLiquidityPools}
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
