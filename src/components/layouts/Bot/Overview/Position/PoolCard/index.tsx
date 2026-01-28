import React, { useMemo } from "react"
import { LiquidityPoolType } from "@/modules/types"
import {
    KaniAvatar,
    KaniAvatarGroup,
    KaniCard,
    KaniCardBody,
    KaniDivider,
    KaniLink,
    KaniSkeleton,
} from "@/components/atomic"
import { useAppSelector } from "@/redux"
import { Spacer } from "@heroui/react"
import { computePercentage } from "@/modules/utils"
import { PoolTypeChip } from "../../../../../reuseable"
import { CLMM } from "./CLMM"
import { DLMM } from "./DLMM"
import numeral from "numeral"
import { useQueryBotV2Swr } from "@/hooks/singleton"
import Decimal from "decimal.js"

export const PoolCard = (
) => {
    const botSwr = useQueryBotV2Swr()
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
                    {
                        botSwr.isLoading ? (
                            <KaniSkeleton className="h-[28px] w-[120px] rounded-md" />
                        ) : (
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
                        )
                    }
                    {
                        botSwr.isLoading ? (
                            <KaniSkeleton className="h-[28px] w-[120px] rounded-md" />
                        ) : (
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
                                    <div className="text-sm">
                                        {tokenA?.name}-{tokenB?.name}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 justify-end">
                                    <div className="text-sm">
                                        {computePercentage({ numerator: new Decimal(activePosition?.associatedLiquidityPool?.fee ?? 0), denominator: new Decimal(1) }).toString()}%
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <Spacer y={6} />
                {
                    activePosition?.associatedLiquidityPool?.type === LiquidityPoolType.Dlmm 
                        ? <DLMM liquidityPool={activePosition?.associatedLiquidityPool} /> 
                        : <CLMM liquidityPool={activePosition?.associatedLiquidityPool} />
                }
                <Spacer y={3} />
                <KaniDivider />
                <Spacer y={3} />
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">TVL</div>
                        <div className="text-sm">{
                            !botSwr.isLoading ? `$${numeral(activePosition?.associatedLiquidityPool?.analytics?.tvl).format("0,0.00")}`
                                : <KaniSkeleton className="h-5 w-[50px] rounded-md" />
                        }</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">Fees 24H</div>
                        <div className="text-sm">{
                            !botSwr.isLoading 
                                ? `$${numeral(activePosition?.associatedLiquidityPool?.analytics?.fees24H).format("0,0.00")}`
                                : <KaniSkeleton className="h-5 w-[50px] rounded-md" />
                        }</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">Volume 24H</div>
                        <div className="text-sm">{
                            !botSwr.isLoading 
                                ? `$${numeral(activePosition?.associatedLiquidityPool?.analytics?.volume24H).format("0,0.00")}`
                                : <KaniSkeleton className="h-5 w-[50px] rounded-md" />}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">APR 24H</div>
                        <div className="flex items-center gap-2 text-sm">
                            {
                                !botSwr.isLoading 
                                    ? `${numeral(activePosition?.associatedLiquidityPool?.analytics?.apr24H).format("0,0.00")}%`
                                    : <KaniSkeleton className="h-5 w-[50px] rounded-md" />}
                        </div>
                    </div>
                </div>  
                <Spacer y={6} />
                <div className="flex items-center justify-end">
                    {!botSwr.isLoading ? (
                        <KaniLink
                            color="foreground"
                            className="text-secondary"
                            isExternal
                            size="sm"
                            showAnchorIcon={true}
                            href={activePosition?.associatedLiquidityPool?.url ?? ""}>
                            Details
                        </KaniLink>
                    ) : (
                        <KaniSkeleton className="h-5 w-[150px] rounded-md" />
                    )
                    }  
                </div>
            </KaniCardBody>
        </KaniCard >
    )
}
