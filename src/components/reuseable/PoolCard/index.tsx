import { 
    KaniAvatar, 
    KaniAvatarGroup, 
    KaniCard, 
    KaniCardBody, 
    KaniDivider, 
    KaniLink, 
    KaniSkeleton
} from "../../atomic"
import React from "react"
import { LiquidityPoolSchema } from "@/modules/types"
import { useAppSelector } from "@/redux"
import { centerPad, computePercentage } from "@/modules/utils"
import { Spacer } from "@heroui/react"
import numeral from "numeral"
import { PoolTypeChip } from "../PoolTypeChip"
import { TooltipTitle } from "../TooltipTitle"

export interface PoolCardProps {
    liquidityPool: LiquidityPoolSchema
}

export const PoolCard = ({ liquidityPool }: PoolCardProps) => {
    const tokens = useAppSelector((state) => state.static.tokens)
    const tokenA = tokens.find((token) => token.id === liquidityPool.tokenA)
    const tokenB = tokens.find((token) => token.id === liquidityPool.tokenB)
    const dexes = useAppSelector((state) => state.static.dexes)
    const dex = dexes.find((dex) => dex.id === liquidityPool.dex)
    return (
        <KaniCard 
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
                <Spacer y={3} />
                <KaniDivider />
                <Spacer y={3} />
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <TooltipTitle title="TVL" classNames={{ title: "text-sm text-foreground-500" }} />
                        <div className="text-sm">{liquidityPool.dynamicInfo?.tvl 
                            ? `$${numeral(liquidityPool.dynamicInfo?.tvl).format("0,0")}` 
                            : <KaniSkeleton className="h-5 w-[50px] rounded-md"/>
                        }</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <TooltipTitle title="Fees 24H" classNames={{ title: "text-sm text-foreground-500" }} />
                        <div className="text-sm">{liquidityPool.dynamicInfo?.fees24H 
                            ? `$${numeral(liquidityPool.dynamicInfo?.fees24H).format("0,0")}` 
                            : <KaniSkeleton className="h-5 w-[50px] rounded-md"/>}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <TooltipTitle title="Volume 24H" classNames={{ title: "text-sm text-foreground-500" }} />
                        <div className="text-sm">{liquidityPool.dynamicInfo?.volume24H 
                            ? `$${numeral(liquidityPool.dynamicInfo?.volume24H).format("0,0")}` 
                            : <KaniSkeleton className="h-5 w-[50px] rounded-md"/>}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <TooltipTitle title="APR 24H" classNames={{ title: "text-sm text-foreground-500" }} />
                        <div className="flex items-center gap-2">
                            {liquidityPool.dynamicInfo?.apr24H 
                                ?
                                <div className="text-sm">
                                    {`${computePercentage(liquidityPool.dynamicInfo?.apr24H ?? 0, 1, 2).toString()}%`}
                                </div>
                                : <KaniSkeleton className="h-5 w-[50px] rounded-md"/>}
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
                    {centerPad(liquidityPool.url ?? "", 18, 6)}
                </KaniLink>
            </KaniCardBody>
        </KaniCard>
    )
}