import {
    KaniAvatar,
    KaniAvatarGroup,
    KaniBadge,
    KaniCard,
    KaniCardBody,
    KaniDivider,
    KaniLink,
    KaniSkeleton
} from "../../atomic"
import React from "react"
import { LiquidityPoolSchema } from "@/modules/types"
import { useAppSelector } from "@/redux"
import { truncateMiddle, computePercentage } from "@/modules/utils"
import { cn, Spacer } from "@heroui/react"
import numeral from "numeral"
import { PoolTypeChip } from "../PoolTypeChip"
import { TooltipTitle } from "../TooltipTitle"
import { SealCheckIcon } from "@phosphor-icons/react"
import Decimal from "decimal.js"

export interface PoolCardProps {
    liquidityPool: LiquidityPoolSchema
    className?: string
    isSelected?: boolean
    onPress?: (liquidityPool: LiquidityPoolSchema) => void
}

export const PoolCard = ({ liquidityPool, className, isSelected, onPress }: PoolCardProps) => {
    const tokens = useAppSelector((state) => state.static.tokens)
    const tokenA = tokens.find((token) => token.id === liquidityPool.tokenA)
    const tokenB = tokens.find((token) => token.id === liquidityPool.tokenB)
    const dexes = useAppSelector((state) => state.static.dexes)
    const dex = dexes.find((dex) => dex.id === liquidityPool.dex)
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
                            <div className="text-sm">
                                {tokenA?.name}-{tokenB?.name}
                            </div>
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                            <div className="text-sm">
                                {computePercentage({ numerator: new Decimal(liquidityPool.fee), denominator: new Decimal(1) }).toString()}%
                            </div>
                        </div>
                    </div>
                </div>
                <Spacer y={3} />
                <KaniDivider />
                <Spacer y={3} />
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <TooltipTitle title="TVL" classNames={{ title: "text-sm text-foreground-500" }} />
                        <div className="text-sm">{liquidityPool.dynamicInfo?.tvl
                            ? `$${numeral(liquidityPool.dynamicInfo?.tvl).format("0,0")}`
                            : <KaniSkeleton className="h-5 w-[50px] rounded-md" />
                        }</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <TooltipTitle title="Fees 24H" classNames={{ title: "text-sm text-foreground-500" }} />
                        <div className="text-sm">{liquidityPool.dynamicInfo?.fees24H
                            ? `$${numeral(liquidityPool.dynamicInfo?.fees24H).format("0,0")}`
                            : <KaniSkeleton className="h-5 w-[50px] rounded-md" />}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <TooltipTitle title="Volume 24H" classNames={{ title: "text-sm text-foreground-500" }} />
                        <div className="text-sm">{liquidityPool.dynamicInfo?.volume24H
                            ? `$${numeral(liquidityPool.dynamicInfo?.volume24H).format("0,0")}`
                            : <KaniSkeleton className="h-5 w-[50px] rounded-md" />}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <TooltipTitle title="APR 24H" classNames={{ title: "text-sm text-foreground-500" }} />
                        <div className="flex items-center gap-2">
                            {liquidityPool.dynamicInfo?.apr24H
                                ?
                                <div className="text-sm">
                                    {`${computePercentage({ numerator: new Decimal(liquidityPool.dynamicInfo?.apr24H ?? 0), denominator: new Decimal(1) }).toString()}%`}
                                </div>
                                : <KaniSkeleton className="h-5 w-[50px] rounded-md" />}
                        </div>
                    </div>
                </div>
                <Spacer y={3} />
                <KaniDivider />
                <Spacer y={3} />
                <KaniLink
                    color="foreground"
                    size="sm"
                    isExternal
                    showAnchorIcon={true}
                    href={liquidityPool.url ?? ""}
                >
                    {truncateMiddle({ str: liquidityPool.url ?? "" })}
                </KaniLink>
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