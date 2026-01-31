import React, { useMemo } from "react"
import { LiquidityPoolType } from "@/modules/types"
import {
    KaniAvatar,
    KaniAvatarGroup,
    KaniCard,
    KaniCardBody,
    KaniDivider,
    KaniLink,
} from "../../../../../atomic"
import { useAppSelector } from "@/redux"
import { Spacer } from "@heroui/react"
import { computePercentage, round } from "@/modules/utils"
import { PoolTypeChip } from "../../../../../reuseable"
import { CLMMContent } from "./CLMMContent"
import { DLMMContent } from "./DLMMContent"
import Decimal from "decimal.js"

export const PoolCard = (
) => {
    const activePosition = useAppSelector((state) => state.bot.bot?.activePosition)
    const tokens = useAppSelector((state) => state.static.tokens)
    const tokenA = useMemo(
        () => tokens.find((token) => token.id === activePosition?.associatedLiquidityPool?.tokenA),
        [tokens, activePosition?.associatedLiquidityPool?.tokenA]
    )
    const tokenB = useMemo(
        () => tokens.find((token) => token.id === activePosition?.associatedLiquidityPool?.tokenB),
        [tokens, activePosition?.associatedLiquidityPool?.tokenB]
    )
    const dexes = useAppSelector((state) => state.static.dexes)
    const dex = useMemo(
        () => dexes.find((dex) => dex.id === activePosition?.associatedLiquidityPool?.dex),
        [dexes, activePosition?.associatedLiquidityPool?.dex]
    )
    return (
        <KaniCard>
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
                            type={activePosition?.associatedLiquidityPool?.type ?? LiquidityPoolType.Clmm}
                        />
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                        <div className="flex items-center gap-2 justify-center">
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
                            <KaniLink
                                color="foreground"
                                isExternal
                                size="sm"
                                underline="hover"
                                href={activePosition?.associatedLiquidityPool?.url ?? ""}>
                                {tokenA?.name}-{tokenB?.name}
                            </KaniLink>
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                            <div className="text-sm">
                                {computePercentage({ numerator: new Decimal(activePosition?.associatedLiquidityPool?.fee ?? 0), denominator: new Decimal(1) }).toString()}%
                            </div>
                        </div>
                    </div>
                </div>
                <Spacer y={6} />
                {
                    activePosition?.associatedLiquidityPool?.type === LiquidityPoolType.Dlmm 
                        ? <DLMMContent /> 
                        : <CLMMContent />
                }
                <Spacer y={3} />
                <KaniDivider />
                <Spacer y={3} />
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">TVL</div>
                        <div className="text-sm">{
                            `$${ round(new Decimal(activePosition?.associatedLiquidityPool?.analytics?.tvl ?? 0))}`
                        }</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">Fees 24H</div>
                        <div className="text-sm">{
                            `$${round(new Decimal(activePosition?.associatedLiquidityPool?.analytics?.fees24H ?? 0))}`
                        }</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">Volume 24H</div>
                        <div className="text-sm">{
                            `$${round(new Decimal(activePosition?.associatedLiquidityPool?.analytics?.volume24H ?? 0))}`
                        }</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">APR 24H</div>
                        <div className="flex items-center gap-2 text-sm">
                            {round(new Decimal(activePosition?.associatedLiquidityPool?.analytics?.apr24H ?? 0))}%
                        </div>
                    </div>
                </div>  
            </KaniCardBody>
        </KaniCard >
    )
}
