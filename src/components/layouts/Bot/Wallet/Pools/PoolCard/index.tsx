import { 
    KaniAvatar, 
    KaniAvatarGroup, 
    KaniCard, 
    KaniCardBody, 
    KaniDivider, 
    KaniSkeleton
} from "../../../../../atomic"
import React from "react"
import { LiquidityPoolSchema } from "@/modules/types"
import { useAppSelector } from "@/redux"
import { computePercentage, roundNumber } from "@/modules/utils"
import { Spacer } from "@heroui/react"
import { PoolTypeChip } from "../../../../../reuseable"
import numeral from "numeral"

export interface PoolCardProps {
    liquidityPool: LiquidityPoolSchema
}

export const PoolCard = ({ liquidityPool }: PoolCardProps) => {
    const tokens = useAppSelector((state) => state.static.tokens)
    const tokenA = tokens.find((token) => token.id === liquidityPool.tokenA)
    const tokenB = tokens.find((token) => token.id === liquidityPool.tokenB)
    const dexes = useAppSelector((state) => state.static.dexes)
    const dex = dexes.find((dex) => dex.id === liquidityPool.dex)
    const dynamicLiquidityPoolInfos = useAppSelector((state) => state.dynamic.dynamicLiquidityPoolInfos)
    const dynamicLiquidityPoolInfo = dynamicLiquidityPoolInfos.find((dynamicLiquidityPoolInfo) => dynamicLiquidityPoolInfo.id === liquidityPool.id)
    
    return (
        <KaniCard 
            shadow="none" 
            className="bg-content2" 
            isPressable>
            <KaniCardBody>
                <div className="flex items-center gap-4 justify-between">
                    <div className="flex items-center gap-2 justify-start">
                        <div className="flex items-center gap-1">
                            <KaniAvatar
                                src={dex?.iconUrl}
                                classNames={{
                                    base: "w-5 h-5",
                                }}
                                radius="full"
                            />
                            <div className="text-sm">{dex?.name}</div>
                        </div>
                        <PoolTypeChip
                            type={liquidityPool.type}
                        />
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                        <div className="flex items-center gap-1 justify-center">
                            <KaniAvatarGroup>
                                <KaniAvatar
                                    src={tokenA?.iconUrl}
                                    classNames={{
                                        base: "w-5 h-5 z-10",
                                    }}
                                    radius="full"
                                />
                                <KaniAvatar
                                    src={tokenB?.iconUrl}
                                    classNames={{
                                        base: "w-5 h-5",
                                    }}
                                    radius="full"
                                />
                            </KaniAvatarGroup>
                            <div className="text-sm">
                                {tokenA?.name}-{tokenB?.name}
                            </div>
                            <div className="flex items-center gap-1"></div>
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                            <div className="text-sm">
                                {computePercentage(liquidityPool.fee, 1, 5).toString()}%
                            </div>
                        </div>
                    </div>
                </div>
                <Spacer y={4} />
                <KaniDivider />
                <Spacer y={4} />
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">TVL</div>
                        <div className="text-sm">{dynamicLiquidityPoolInfo?.tvl 
                            ? `$${numeral(roundNumber(dynamicLiquidityPoolInfo?.tvl, 2)).format("0,0")}` 
                            : <KaniSkeleton className="h-5 w-[50px] rounded-md"/>
                        }</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">Fees 24H</div>
                        <div className="text-sm">{dynamicLiquidityPoolInfo?.fees24H 
                            ? `$${numeral(roundNumber(dynamicLiquidityPoolInfo?.fees24H ?? 0, 2)).format("0,0")}` 
                            : <KaniSkeleton className="h-5 w-[50px] rounded-md"/>}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">Volume 24H</div>
                        <div className="text-sm">{dynamicLiquidityPoolInfo?.volume24H 
                            ? `$${numeral(roundNumber(dynamicLiquidityPoolInfo?.volume24H ?? 0, 2)).format("0,0")}` 
                            : <KaniSkeleton className="h-5 w-[50px] rounded-md"/>}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">APR 24H</div>
                        <div className="flex items-center gap-2">
                            {dynamicLiquidityPoolInfo?.apr24H 
                                ?
                                <div className="text-sm">
                                    {`${roundNumber(computePercentage(dynamicLiquidityPoolInfo?.apr24H ?? 0, 1, 2).toNumber(), 2)}%`}
                                </div>
                                : <KaniSkeleton className="h-5 w-[50px] rounded-md"/>}
                        </div>
                    </div>
                </div>  
            </KaniCardBody>
        </KaniCard>
    )
}