import { 
    KaniAvatar, 
    KaniAvatarGroup, 
    KaniCard, 
    KaniCardBody, 
    KaniDivider, 
    KaniLink
} from "@/components/atomic"
import React from "react"
import { LiquidityPoolSchema } from "@/modules/types"
import { useAppSelector } from "@/redux"
import { centerPad, computePercentage } from "@/modules/utils"
import { Spacer } from "@heroui/react"

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
        <KaniCard shadow="none" className="bg-content2">
            <KaniCardBody>
                <div className="flex items-center justify-between">
                    <div className="text-primary font-medium">{
                        dynamicLiquidityPoolInfo?.apr24H ? 
                            `${computePercentage(dynamicLiquidityPoolInfo?.apr24H ?? 0, 1, 2)}% APR` 
                            : "N/A"
                    }</div>
                </div>
                <Spacer y={4} />
                <KaniDivider />
                <Spacer y={4} />
                <div className="flex items-center gap-2 grid grid-cols-3">
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
                    <div className="flex items-center gap-1 justify-center">
                        <KaniAvatarGroup>
                            <KaniAvatar
                                src={tokenA?.iconUrl}
                                classNames={{
                                    base: "w-5 h-5",
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
                            {computePercentage(liquidityPool.fee, 1, 5)}%
                        </div>
                    </div>
                </div>
                <Spacer y={4} />
                <KaniLink 
                    color="foreground" 
                    size="sm" 
                    isExternal 
                    showAnchorIcon={true} 
                    href={liquidityPool.url}>{
                        centerPad(liquidityPool.url, 18, 6)
                    }
                </KaniLink>
            </KaniCardBody>
        </KaniCard>
    )
}