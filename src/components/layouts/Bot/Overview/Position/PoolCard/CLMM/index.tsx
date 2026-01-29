import { LiquidityPoolSchema, PerformanceDisplayMode } from "@/modules/types";
import {
    DynamicClmmLiquidityPoolInfoCacheResult,
    updateBotPerformanceDisplayMode,
    useAppSelector,
} from "@/redux";
import React, { useMemo } from "react";
import { computePercentage, round, tickIndexToPrice } from "@/modules/utils";
import { LiquidityChart } from "@/components/reuseable/charts";
import {
    KaniChip,
    KaniDivider,
    KaniImage,
    KaniSkeleton,
} from "@/components/atomic";
import Decimal from "decimal.js";
import { Spacer } from "@heroui/react";
import { useQueryReservesWithFeesV2Swr, useUpdateBotPerformanceDisplayModeV2SwrMutation } from "@/hooks/singleton";
import numeral from "numeral";
import { TooltipTitle, UnitDropdown } from "@/components/reuseable";
import { useAppDispatch } from "@/redux";

export interface CLMMProps {
    liquidityPool?: LiquidityPoolSchema;
}

export const CLMM = ({ liquidityPool }: CLMMProps) => {
    const updateBotPerformanceDisplayModeV2SwrMutation = useUpdateBotPerformanceDisplayModeV2SwrMutation()
    const dispatch = useAppDispatch();
    const bot = useAppSelector((state) => state.bot.bot);
    const tokens = useAppSelector((state) => state.static.tokens);
    const tokenA = useMemo(
        () => tokens.find((token) => token.id === liquidityPool?.tokenA),
        [tokens, liquidityPool?.tokenA],
    );
    const tokenB = useMemo(
        () => tokens.find((token) => token.id === liquidityPool?.tokenB),
        [tokens, liquidityPool?.tokenB],
    );
    const activePosition = useAppSelector(
        (state) => state.bot.bot?.activePosition,
    );
    const tickLower = useMemo(() => {
        return activePosition?.associatedPosition?.clmmState?.tickLower;
    }, [activePosition]);
    const tickUpper = useMemo(() => {
        return activePosition?.associatedPosition?.clmmState?.tickUpper;
    }, [activePosition]);
    const dynamicLiquidityPoolInfos = useAppSelector(
        (state) => state.socket.dynamicLiquidityPoolInfos,
    );
    const tickCurrent = useMemo(() => {
        const dynamicLiquidityPoolInfo = dynamicLiquidityPoolInfos[
            activePosition?.liquidityPool ?? ""
        ] as DynamicClmmLiquidityPoolInfoCacheResult;
        return dynamicLiquidityPoolInfo?.tickCurrent.toNumber();
    }, [activePosition, dynamicLiquidityPoolInfos]);
    const tickLowerPrice = useMemo(() => {
        return tickIndexToPrice(
            tickLower ?? 0,
            tokenA?.decimals ?? 0,
            tokenB?.decimals ?? 0,
        );
    }, [tickLower, tokenA?.decimals, tokenB?.decimals]);
    const tickUpperPrice = useMemo(() => {
        return tickIndexToPrice(
            tickUpper ?? 0,
            tokenA?.decimals ?? 0,
            tokenB?.decimals ?? 0,
        );
    }, [tickUpper, tokenA?.decimals, tokenB?.decimals]);
    const currentPrice = useMemo(() => {
        return tickIndexToPrice(
            tickCurrent ?? 0,
            tokenA?.decimals ?? 0,
            tokenB?.decimals ?? 0,
        );
    }, [tickCurrent, tokenA?.decimals, tokenB?.decimals]);
    const isInRange = useMemo(() => {
        return currentPrice.gte(tickLowerPrice) && currentPrice.lte(tickUpperPrice);
    }, [currentPrice, tickLowerPrice, tickUpperPrice]);
    const tokenPrices = useAppSelector((state) => state.socket.prices);
    const tokenPriceA = useMemo(() => {
        return tokenPrices[tokenA?.id ?? ""] ?? 0;
    }, [tokenPrices, tokenA?.id]);
    const tokenPriceB = useMemo(() => {
        return tokenPrices[tokenB?.id ?? ""] ?? 0;
    }, [tokenPrices, tokenB?.id]);
    const queryReservesWithFeesV2Swr = useQueryReservesWithFeesV2Swr();
    const tokenAFee = useMemo(() => {
        return new Decimal(
            queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeA ??
            0,
        );
    }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeA]);
    const tokenBFee = useMemo(() => {
        return new Decimal(
            queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeB ??
            0,
        );
    }, [queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.feeB]);
    const totalFeesInUsd = useMemo(() => {
        return round(
            tokenAFee
                .add(tokenBFee)
                .mul(new Decimal(tokenPriceA.price ?? 0))
                .add(tokenBFee.mul(new Decimal(tokenPriceB.price ?? 0))),
        );
    }, [tokenAFee, tokenBFee, tokenPriceA.price, tokenPriceB.price]);
    const tokenAReserve = useMemo(() => {
        return new Decimal(
            queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data
                ?.reserveA ?? 0,
        );
    }, [
        queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.reserveA,
    ]);
    const tokenBReserve = useMemo(() => {
        return new Decimal(
            queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data
                ?.reserveB ?? 0,
        );
    }, [
        queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.reserveB,
    ]);
    const totalReservesInUsd = useMemo(() => {
        return round(
            tokenAReserve
                .mul(new Decimal(tokenPriceA.price ?? 0))
                .add(tokenBReserve.mul(new Decimal(tokenPriceB.price ?? 0))),
        );
    }, [tokenAReserve, tokenBReserve, tokenPriceA.price, tokenPriceB.price]);
    const rewards = useMemo(() => {
        return Object.entries(
            queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data
                ?.rewards ?? {},
        );
    }, [
        queryReservesWithFeesV2Swr?.data?.data?.reservesWithFeesV2.data?.rewards,
    ]);
    const totalRewardsInUsd = useMemo(() => {
        return round(
            rewards
                .map(([tokenId, reward]) => {
                    return new Decimal(reward).mul(
                        new Decimal(tokenPrices[tokenId]?.price ?? 0),
                    );
                })
                .reduce((acc, reward) => {
                    return acc.add(reward);
                }, new Decimal(0)),
        );
    }, [rewards, tokenPrices]);

    const totalReservesInTarget = useMemo(() => {
        if (!tokenPriceA.price || !tokenPriceB.price) {
            return new Decimal(0);
        }
        return tokenAReserve.add(
            tokenBReserve.mul(
                new Decimal(tokenPriceB.price).div(new Decimal(tokenPriceA.price)),
            ),
        );
    }, [tokenAReserve, tokenBReserve, tokenPriceA.price, tokenPriceB.price]);
    const totalFeesInTarget = useMemo(() => {
        if (!tokenPriceA.price || !tokenPriceB.price) {
            return new Decimal(0);
        }
        return tokenAFee
            .add(tokenBFee)
            .mul(new Decimal(tokenPriceA.price).div(new Decimal(tokenPriceB.price)));
    }, [tokenAFee, tokenBFee, tokenPriceA.price, tokenPriceB.price]);
    const totalRewardsInTarget = useMemo(() => {
        return rewards
            .map(([tokenId, reward]) => {
                return new Decimal(reward).mul(
                    new Decimal(tokenPrices[tokenId]?.price ?? 0).div(
                        new Decimal(tokenPrices[tokenId]?.price ?? 0),
                    ),
                );
            })
            .reduce((acc, reward) => {
                return acc.add(reward);
            }, new Decimal(0));
    }, [rewards, tokenPrices]);

    const [pnlString, isPositivePnl] = useMemo(() => {
        const totalInTarget = totalReservesInTarget
            .add(totalFeesInTarget)
            .add(totalRewardsInTarget);
        const prev =
            bot?.activePosition?.associatedPosition?.openSnapshot?.positionValue ?? 0;
        const isPositivePnl24h = new Decimal(totalInTarget.sub(prev)).isPositive();
        const pnl = `${isPositivePnl24h ? "+" : "-"}${round(
            new Decimal(totalInTarget.sub(prev)),
        )
            .abs()
            .toString()} ${tokenA?.symbol}`;
        return [pnl, isPositivePnl24h];
    }, [
        bot?.activePosition?.associatedPosition?.openSnapshot?.positionValue,
        totalReservesInTarget,
        totalFeesInTarget,
        totalRewardsInTarget,
    ]);
    const [roiString, isPositiveRoi] = useMemo(() => {
        const totalInTarget = totalReservesInTarget
            .add(totalFeesInTarget)
            .add(totalRewardsInTarget);
        const prev =
            bot?.activePosition?.associatedPosition?.openSnapshot?.positionValue ?? 0;
        const isPositiveRoi24h = new Decimal(
            totalInTarget.sub(prev).div(prev),
        ).isPositive();
        const roi = `${isPositiveRoi24h ? "+" : "-"}${round(computePercentage({ numerator: new Decimal(totalInTarget.sub(prev)), denominator: new Decimal(prev) })).abs().toString()}%`;
        return [roi, isPositiveRoi24h];
    }, [bot?.activePosition?.associatedPosition?.openSnapshot?.positionValue]);
    const [pnlInUsdString, isPositivePnlInUsd] = useMemo(() => {
        const totalInUsd = totalReservesInUsd
            .add(totalFeesInUsd)
            .add(totalRewardsInUsd);
        const prev =
            bot?.activePosition?.associatedPosition?.openSnapshot
                ?.positionValueInUsd ?? 0;
        const isPositivePnlInUsd = new Decimal(totalInUsd.sub(prev)).isPositive();
        const pnlInUsd = `${isPositivePnlInUsd ? "+" : "-"}${round(
            new Decimal(totalInUsd.sub(prev)),
        )
            .abs()
            .toString()} USD`;
        return [pnlInUsd, isPositivePnlInUsd];
    }, [
        bot?.activePosition?.associatedPosition?.openSnapshot?.positionValueInUsd,
        totalReservesInUsd,
        totalFeesInUsd,
        totalRewardsInUsd,
    ]);
    const [roiInUsdString, isPositiveRoiInUsd] = useMemo(() => {
        const totalInUsd = totalReservesInUsd
            .add(totalFeesInUsd)
            .add(totalRewardsInUsd);
        const prev =
            bot?.activePosition?.associatedPosition?.openSnapshot
                ?.positionValueInUsd ?? 0;
        const isPositiveRoiInUsd = new Decimal(
            totalInUsd.sub(prev).div(prev),
        ).isPositive();
        const roiInUsd = `${isPositiveRoiInUsd ? "+" : "-"}${round(computePercentage({ numerator: new Decimal(totalInUsd.sub(prev)), denominator: new Decimal(prev) })).abs().toString()}%`;
        return [roiInUsd, isPositiveRoiInUsd];
    }, [
        bot?.activePosition?.associatedPosition?.openSnapshot?.positionValueInUsd,
        totalReservesInUsd,
        totalFeesInUsd,
        totalRewardsInUsd,
    ]);
    const targetToken = useMemo(() => tokens.find((token) => token.id === bot?.targetToken), [tokens, bot?.targetToken])
    if (!targetToken) {
        return null
    }
    if (!bot) {
        return null
    }
    return (
        <>
            {
                <div>
                    <div className="grid place-items-center gap-3">
                        <div className="text-xs">
                            Price: {round(currentPrice).toNumber()}
                        </div>
                        <LiquidityChart
                            priceLower={tickLowerPrice}
                            priceUpper={tickUpperPrice}
                            currentPrice={currentPrice}
                        />
                        <div className="flex items-center gap-2">
                            <div className="text-xs">
                                {round(tickLowerPrice).toNumber()} -{" "}
                                {round(tickUpperPrice).toNumber()}{" "}
                                <span className="text-secondary">{tokenB?.symbol}</span> per{" "}
                                <span className="text-secondary">{tokenA?.symbol}</span>
                            </div>
                            <KaniChip
                                color={isInRange ? "success" : "danger"}
                                size="sm"
                                variant="flat"
                            >
                                {isInRange ? "In Range" : "Out of Range"}
                            </KaniChip>
                        </div>
                    </div>
                </div>
            }
            <Spacer y={6} />
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <TooltipTitle
                        title="Reserves"
                        classNames={{ title: "text-sm text-foreground-500" }}
                        tooltipString="Reserves are the reserves of the pool."
                    />
                    {queryReservesWithFeesV2Swr.isLoading ||
                        !queryReservesWithFeesV2Swr.data ? (
                        <KaniSkeleton className="h-[28px] w-[120px] rounded-md" />
                    ) : (
                        <div className="grid grid-cols-[1fr_150px] items-center gap-2">
                            <div className="flex items-center gap-2">
                                <div className="text-sm">
                                    ${numeral(totalReservesInUsd.toNumber()).format("0,0.00000")}
                                </div>
                                <KaniDivider orientation="vertical" className="h-5" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <KaniChip
                                    className="ml-auto"
                                    variant="flat"
                                    startContent={
                                        <KaniImage src={tokenA?.iconUrl} className="w-5 h-5" />
                                    }
                                >
                                    {tokenAReserve.toNumber()} {tokenA?.symbol}
                                </KaniChip>
                                <KaniChip
                                    className="ml-auto"
                                    variant="flat"
                                    startContent={
                                        <KaniImage src={tokenB?.iconUrl} className="w-5 h-5" />
                                    }
                                >
                                    {tokenBReserve.toNumber()} {tokenB?.symbol}
                                </KaniChip>
                            </div>
                        </div>
                    )}
                </div>
                <Spacer y={3} />
                <div className="flex items-center justify-between">
                    <TooltipTitle
                        title="Fees"
                        classNames={{ title: "text-sm text-foreground-500" }}
                        tooltipString="Fees are the fees earned by the bot for providing liquidity to the pool."
                    />
                    {queryReservesWithFeesV2Swr.isLoading ||
                        !queryReservesWithFeesV2Swr.data ? (
                        <KaniSkeleton className="h-[28px] w-[120px] rounded-md" />
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="text-sm">
                                ${numeral(totalFeesInUsd.toNumber()).format("0,0.00000")}
                            </div>
                            <div className="grid grid-cols-[1fr_150px] items-center gap-2">
                                <KaniDivider orientation="vertical" className="h-5" />
                                <div className="flex flex-col gap-2">
                                    <KaniChip
                                        className="ml-auto"
                                        variant="flat"
                                        startContent={
                                            <KaniImage src={tokenA?.iconUrl} className="w-5 h-5" />
                                        }
                                    >
                                        <span className="text-secondary">
                                            +{tokenAFee.toNumber()} {tokenA?.symbol}
                                        </span>
                                    </KaniChip>
                                    <KaniChip
                                        className="ml-auto"
                                        variant="flat"
                                        startContent={
                                            <KaniImage src={tokenB?.iconUrl} className="w-5 h-5" />
                                        }
                                    >
                                        <span className="text-secondary">
                                            +{tokenBFee.toNumber()} {tokenB?.symbol}
                                        </span>
                                    </KaniChip>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {rewards.length > 0 && (
                    <>
                        <Spacer y={3} />
                        <div className="flex items-center justify-between">
                            <TooltipTitle
                                title="Rewards"
                                classNames={{ title: "text-sm text-foreground-500" }}
                                tooltipString="Rewards are the rewards earned by the bot for providing liquidity to the pool."
                            />
                            {queryReservesWithFeesV2Swr.isLoading ||
                                !queryReservesWithFeesV2Swr.data ? (
                                <KaniSkeleton className="h-[28px] w-[120px] rounded-md" />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className="text-sm">
                                        ${numeral(totalRewardsInUsd.toNumber()).format("0,0.00000")}
                                    </div>
                                    <div className="grid grid-cols-[1fr_150px] items-center gap-2">
                                        <KaniDivider orientation="vertical" className="h-5" />
                                        <div className="flex flex-col gap-2">
                                            {rewards.map(([tokenId, reward]) => (
                                                <KaniChip
                                                    key={tokenId}
                                                    className="ml-auto"
                                                    variant="flat"
                                                    startContent={
                                                        <KaniImage
                                                            src={
                                                                tokens.find((token) => token.id === tokenId)
                                                                    ?.iconUrl
                                                            }
                                                            className="w-5 h-5"
                                                        />
                                                    }
                                                >
                                                    <span className="text-secondary">
                                                        +{reward}{" "}
                                                        {
                                                            tokens.find((token) => token.id === tokenId)
                                                                ?.symbol
                                                        }
                                                    </span>
                                                </KaniChip>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
                <Spacer y={3} />
                <div className="flex items-center gap-4 justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex justify-between items-center gap-2">
                            <TooltipTitle
                                classNames={{
                                    title: "text-sm text-foreground-500",
                                }}
                                title="ROI"
                                tooltipString="The return on investment, showing how much profit or loss the bot made compared to the initial position value."
                            />
                            <div
                                className={`text-sm ${bot.performanceDisplayMode === PerformanceDisplayMode.Usd ? (isPositiveRoiInUsd ? "text-success" : "text-danger") : isPositiveRoi ? "text-success" : "text-danger"}`}
                            >
                                {bot.performanceDisplayMode === PerformanceDisplayMode.Usd
                                    ? roiInUsdString
                                    : roiString}
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <TooltipTitle
                                classNames={{
                                    title: "text-sm text-foreground-500",
                                }}
                                title="PNL"
                                tooltipString="The return on investment, showing how much profit or loss the bot made compared to the initial position value."
                            />
                            <div
                                className={`text-sm ${bot.performanceDisplayMode === PerformanceDisplayMode.Usd ? (isPositivePnlInUsd ? "text-success" : "text-danger") : isPositivePnl ? "text-success" : "text-danger"}`}
                            >
                                {bot.performanceDisplayMode === PerformanceDisplayMode.Usd
                                    ? pnlInUsdString
                                    : pnlString}
                            </div>
                        </div>
                    </div>
                    <UnitDropdown
                        targetToken={targetToken}
                        value={bot.performanceDisplayMode}
                        onValueChange={
                            async (value) => {
                                // optimistic update
                                dispatch(updateBotPerformanceDisplayMode({
                                    id: bot.id,
                                    performanceDisplayMode: value,
                                }))
                                // update server
                                await updateBotPerformanceDisplayModeV2SwrMutation.trigger({
                                    request: {
                                        id: bot.id,
                                        performanceDisplayMode: value,
                                    },
                                })
                            }}
                    />
                </div>
            </div>
        </>
    );
};
