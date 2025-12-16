import React, { useMemo } from "react"
import { LiquidityPoolSchema, LiquidityPoolType } from "@/modules/types"
import {
    KaniAvatar,
    KaniAvatarGroup,
    KaniCard,
    KaniCardBody,
    KaniDivider,
    KaniLink,
} from "@/components/atomic"
import { useAppSelector } from "@/redux"
import { Spacer } from "@heroui/react"
import { centerPad, computePercentage, roundNumber } from "@/modules/utils"
import { PoolTypeChip } from "../PoolTypeChip"
import { CLMM } from "./CLMM"
import { DLMM } from "./DLMM"

export interface PoolCardStaticProps {
  liquidityPool: LiquidityPoolSchema;
}

export const PoolCardStatic = (
    { liquidityPool }: PoolCardStaticProps
) => {
    const dynamicLiquidityPoolInfos = useAppSelector((state) => state.dynamic.dynamicLiquidityPoolInfos)
    const dynamicLiquidityPoolInfo = useMemo(() => {
        return dynamicLiquidityPoolInfos.find(
            (dynamicLiquidityPoolInfo) => dynamicLiquidityPoolInfo.id === liquidityPool.id
        )
    }, [dynamicLiquidityPoolInfos, liquidityPool.id])
    const tokens = useAppSelector((state) => state.static.tokens)
    const tokenA = useMemo(
        () => tokens.find((token) => token.id === liquidityPool.tokenA),
        [tokens, liquidityPool.tokenA]
    )
    const tokenB = useMemo(
        () => tokens.find((token) => token.id === liquidityPool.tokenB),
        [tokens, liquidityPool.tokenB]
    )
    const dexes = useAppSelector((state) => state.static.dexes)
    const dex = useMemo(
        () => dexes.find((dex) => dex.id === liquidityPool.dex),
        [dexes, liquidityPool.dex]
    )
    return (
        <KaniCard 
            shadow="none" 
            className="bg-content2" 
        >
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
                </div>
                <Spacer y={4} />
                <KaniDivider />
                <Spacer y={4} />
                {liquidityPool.type === LiquidityPoolType.Clmm ? <CLMM liquidityPool={liquidityPool} /> : <DLMM liquidityPool={liquidityPool} />}
                <Spacer y={4} />
                <KaniDivider />
                <Spacer y={4} />
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">TVL</div>
                        <div className="text-sm">{dynamicLiquidityPoolInfo?.tvl 
                            ? `$${roundNumber(dynamicLiquidityPoolInfo?.tvl, 2)}` 
                            : "N/A"
                        }</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">Fees 24H</div>
                        <div className="text-sm">{dynamicLiquidityPoolInfo?.fees24H 
                            ? `$${roundNumber(dynamicLiquidityPoolInfo?.fees24H ?? 0, 2)}` 
                            : "N/A"}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">Volume 24H</div>
                        <div className="text-sm">{dynamicLiquidityPoolInfo?.volume24H 
                            ? `$${roundNumber(dynamicLiquidityPoolInfo?.volume24H ?? 0, 2)}` 
                            : "N/A"}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">APR 24H</div>
                        <div className="text-sm">{dynamicLiquidityPoolInfo?.apr24H 
                            ? `${computePercentage(dynamicLiquidityPoolInfo?.apr24H ?? 0, 1, 2)}%` 
                            : "N/A"}</div>
                    </div>
                </div>
                <Spacer y={4} />
                <KaniDivider />
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
