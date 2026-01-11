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
import { centerPad, computePercentage } from "@/modules/utils"
import { PoolTypeChip } from "../../../../../reuseable/PoolTypeChip"
import { CLMM } from "./CLMM"
import { DLMM } from "./DLMM"
import numeral from "numeral"
import { useQueryLiquidityPools2ActivePositionSwr } from "@/hooks/singleton"

export const PoolCard = (
) => {
    const { data, isLoading } = useQueryLiquidityPools2ActivePositionSwr()
    const tokens = useAppSelector((state) => state.static.tokens)
    const tokenA = useMemo(
        () => tokens.find((token) => token.id === data?.liquidityPools2.data?.data[0].tokenA),
        [tokens, data?.liquidityPools2.data?.data[0].tokenA]
    )
    const tokenB = useMemo(
        () => tokens.find((token) => token.id === data?.liquidityPools2.data?.data[0].tokenB),
        [tokens, data?.liquidityPools2.data?.data[0].tokenB]
    )
    const dexes = useAppSelector((state) => state.static.dexes)
    const dex = useMemo(
        () => dexes.find((dex) => dex.id === data?.liquidityPools2.data?.data[0].dex),
        [dexes, data?.liquidityPools2.data?.data[0].dex]
    )
    return (
        <KaniCard>
            <KaniCardBody>
                <div className="flex items-center gap-4 justify-between">
                    {
                        isLoading ? (
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
                                    type={data?.liquidityPools2.data?.data[0].type ?? LiquidityPoolType.Clmm}
                                />
                            </div>
                        )
                    }
                    {
                        isLoading ? (
                            <KaniSkeleton className="h-[28px] w-[120px] rounded-md" />
                        ) : (
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
                                        {computePercentage(data?.liquidityPools2.data?.data[0].fee ?? 0, 1, 5).toString()}%
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <Spacer y={3} />
                <KaniDivider />
                <Spacer y={3} />
                {
                    data?.liquidityPools2.data?.data[0].type === LiquidityPoolType.Dlmm 
                        ? <DLMM liquidityPool={data?.liquidityPools2.data?.data[0]} /> 
                        : <CLMM liquidityPool={data?.liquidityPools2.data?.data[0]} />
                }
                <Spacer y={3} />
                <KaniDivider />
                <Spacer y={3} />
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">TVL</div>
                        <div className="text-sm">{
                            !isLoading ? `$${numeral(data?.liquidityPools2.data?.data[0].dynamicInfo?.tvl).format("0,0")}`
                                : <KaniSkeleton className="h-5 w-[50px] rounded-md" />
                        }</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">Fees 24H</div>
                        <div className="text-sm">{
                            !isLoading 
                                ? `$${numeral(data?.liquidityPools2.data?.data[0].dynamicInfo?.fees24H).format("0,0")}`
                                : <KaniSkeleton className="h-5 w-[50px] rounded-md" />
                        }</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">Volume 24H</div>
                        <div className="text-sm">{
                            !isLoading 
                                ? `$${numeral(data?.liquidityPools2.data?.data[0].dynamicInfo?.volume24H).format("0,0")}`
                                : <KaniSkeleton className="h-5 w-[50px] rounded-md" />}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-foreground-500">APR 24H</div>
                        <div className="flex items-center gap-2">
                            {
                                !isLoading 
                                    ? `$${numeral(data?.liquidityPools2.data?.data[0].dynamicInfo?.apr24H).format("0,0")}`
                                    : <KaniSkeleton className="h-5 w-[50px] rounded-md" />}
                        </div>
                    </div>
                </div>
                <Spacer y={3} />
                <KaniDivider />
                <Spacer y={3} />
                {!isLoading ? (
                    <KaniLink
                        color="foreground"
                        size="sm"
                        isExternal
                        showAnchorIcon={true}
                        href={data?.liquidityPools2.data?.data[0].url ?? ""}>{
                            centerPad(data?.liquidityPools2.data?.data[0].url ?? "", 18, 6)
                        }
                    </KaniLink>
                ) : (
                    <KaniSkeleton className="h-5 w-[150px] rounded-md" />
                )}
            </KaniCardBody>
        </KaniCard >
    )
}
