import {
    KaniAvatar,
    KaniAvatarGroup,
    KaniBadge,
    KaniCard,
    KaniCardBody,
    KaniLink,
    KaniSkeleton,
    KaniTooltip
} from "../../atomic"
import React, { useMemo } from "react"
import { LiquidityPoolSchema } from "@/modules/types"
import { useAppSelector } from "@/redux"
import { computePercentage, round } from "@/modules/utils"
import { cn, Spacer } from "@heroui/react"
import { PoolTypeChip } from "../PoolTypeChip"
import { TooltipTitle } from "../TooltipTitle"
import Decimal from "decimal.js"
import { PlantIcon, SealCheckIcon } from "@phosphor-icons/react"
import { DonutChart } from "../charts"

export interface PoolCardProps {
    liquidityPool: LiquidityPoolSchema
    className?: string
    isSelected?: boolean
    onPress?: (liquidityPool: LiquidityPoolSchema) => void
}

export const PoolCard = (
    {
        liquidityPool,
        className,
        isSelected,
        onPress
    }: PoolCardProps
) => {
    const tokens = useAppSelector((state) => state.static.tokens)
    const tokenA = tokens.find((token) => token.id === liquidityPool.tokenA)
    const tokenB = tokens.find((token) => token.id === liquidityPool.tokenB)
    const dexes = useAppSelector((state) => state.static.dexes)
    const dex = dexes.find((dex) => dex.id === liquidityPool.dex)
    const apr24HDecimal = useMemo(() => {
        return new Decimal(liquidityPool.analytics?.apr24H?.total ?? 0)
    }, [liquidityPool.analytics?.apr24H?.total])
    const apr24HString = useMemo(() => {
        return computePercentage({
            numerator: new Decimal(liquidityPool.analytics?.apr24H?.total ?? 0),
            denominator: new Decimal(1),
            fractionDigits: 2,
        }).toString()
    }, [liquidityPool.analytics?.apr24H?.total])
    const apr24HFeesDecimal = useMemo(() => {
        return new Decimal(liquidityPool.analytics?.apr24H?.fees ?? 0)
    }, [liquidityPool.analytics?.apr24H?.fees])
    const apr24HRewardsDecimal = useMemo(() => {
        return new Decimal(liquidityPool.analytics?.apr24H?.rewards ?? 0)
    }, [liquidityPool.analytics?.apr24H?.rewards])
    const renderContent = () => {
        return <KaniCard
            isPressable
            className={cn(className, "w-full", {
                "ring-2 ring-primary": isSelected,
            })}
            onPress={() => onPress?.(liquidityPool)}
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
                                size="sm"
                                underline="hover"
                                className="sm:block hidden"
                                isExternal
                                href={liquidityPool.url ?? ""}>
                                {tokenA?.name}-{tokenB?.name}
                            </KaniLink>
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                            <div className="text-sm">
                                {computePercentage({ numerator: new Decimal(liquidityPool.fee), denominator: new Decimal(1) }).toString()}%
                            </div>
                        </div>
                    </div>
                </div>
                <Spacer y={6} />
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <TooltipTitle title="TVL" classNames={{ title: "text-sm text-foreground-500" }} />
                        <div className="text-sm">{liquidityPool.analytics?.tvl
                            ? `$${round(new Decimal(liquidityPool.analytics?.tvl))}`
                            : <KaniSkeleton className="h-5 w-[50px] rounded-md" />
                        }</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <TooltipTitle title="Fees 24H" classNames={{ title: "text-sm text-foreground-500" }} />
                        <div className="text-sm">{liquidityPool.analytics?.fees24H
                            ? `$${round(new Decimal(liquidityPool.analytics?.fees24H))}`
                            : <KaniSkeleton className="h-5 w-[50px] rounded-md" />}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <TooltipTitle title="Volume 24H" classNames={{ title: "text-sm text-foreground-500" }} />
                        <div className="text-sm">{liquidityPool.analytics?.volume24H
                            ? `$${round(new Decimal(liquidityPool.analytics?.volume24H))}`
                            : <KaniSkeleton className="h-5 w-[50px] rounded-md" />}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <TooltipTitle title="APR 24H" classNames={{ title: "text-sm text-foreground-500" }} />
                        <div className="flex items-center gap-2">
                            {liquidityPool.analytics?.apr24H
                                ?
                                <div className="flex items-center gap-1 text-success">
                                    <PlantIcon
                                        className="w-4 h-4"
                                    />
                                    <KaniTooltip
                                        content={
                                            (
                                                <div>
                                                    <div className="flex items-center gap-1">
                                                        <div className="text-sm text-foreground-500">
                                                        Total APR
                                                        </div>
                                                        <div className="text-sm">
                                                            {computePercentage({ numerator: apr24HDecimal, denominator: new Decimal(1) }).toString()}%
                                                        </div>
                                                    </div>
                                                    <Spacer y={1} />
                                                    <div className="flex items-center gap-1">
                                                        <DonutChart
                                                            showTooltip={false}
                                                            data={
                                                                [
                                                                    { 
                                                                        name: "Fees", 
                                                                        value: apr24HFeesDecimal.toNumber() 
                                                                    },
                                                                    { 
                                                                        name: "Rewards", 
                                                                        value: apr24HRewardsDecimal.toNumber() 
                                                                    },
                                                                ]
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    >
                                        <div className="text-sm">
                                            {`${apr24HString}%`}
                                        </div>
                                    </KaniTooltip>
                                </div>
                                : <KaniSkeleton className="h-5 w-[50px] rounded-md" />}
                        </div>
                    </div>
                </div>
            </KaniCardBody>
        </KaniCard>
    }
    return (
        isSelected ? (
            <KaniBadge content={
                <SealCheckIcon weight="fill" className="w-6 h-6 min-w-6 min-h-6 max-w-6 max-h-6 text-primary" />
            } placement="top-left" classNames={{
                badge: "top-1 left-1 min-w-4 min-h-4 max-w-4 max-h-4 bg-foreground border-none",
            }}>
                {renderContent()}
            </KaniBadge>
        ) : renderContent()
    )
}