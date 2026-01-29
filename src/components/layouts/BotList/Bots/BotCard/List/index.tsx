import React from "react"
import { KaniAvatar, KaniAvatarGroup, KaniCard, KaniCardBody, KaniChip, KaniImage } from "../../../../../atomic"
import { SnippetIcon, TooltipTitle, UnitDropdown } from "../../../../../reuseable"
import { truncateMiddle } from "@/modules/utils"
import { BotCardBaseProps } from "../types"
import { updateBotPerformanceDisplayModeInBots, useAppDispatch } from "@/redux"
import { PerformanceDisplayMode } from "@/modules/types"

export type BotCardListProps = BotCardBaseProps

export const BotCardList = (props: BotCardListProps) => {
    const {
        bot,
        targetToken,
        quoteToken,
        botName,
        isRunning,
        roiString,
        isPositiveRoi,
        pnlString,
        isPositivePnl,
        capitalString,
        liquidityStatusChip,
        chainIconUrl,
        chainName,
        accountAddress,
        poolAddress,
        onCardPress,
    } = props
    const dispatch = useAppDispatch()
    return (
        <KaniCard 
            isPressable 
            onPress={onCardPress} 
            className="w-full"
        >
            <KaniCardBody>
                <div className="grid grid-cols-[150px_2fr_3fr_125px_auto] items-center gap-4 w-full">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <KaniAvatarGroup>
                                    <KaniAvatar src={targetToken.iconUrl} classNames={{
                                        img: "w-6 h-6",
                                        base: "w-6 h-6 z-10",
                                    }}/>
                                    <KaniAvatar src={quoteToken.iconUrl} classNames={{
                                        img: "w-6 h-6",
                                        base: "w-6 h-6",
                                    }}/>
                                </KaniAvatarGroup>
                                <div className="font-bold">
                                    {botName}
                                </div>
                            </div>
                            {
                                isRunning ? (
                                    <KaniChip color="primary" size="sm" variant="flat">
                                    Active
                                    </KaniChip>
                                ) : (
                                    <KaniChip color="secondary" size="sm" variant="flat">
                                    Inactive
                                    </KaniChip>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <TooltipTitle
                                classNames={{
                                    title: "text-sm text-foreground-500",
                                }}
                                title="ROI"
                                tooltipString="The return on investment, showing how much profit or loss the bot made compared to the initial position value."
                            />
                            <div className={`text-sm ${isPositiveRoi ? "text-success" : "text-danger"}`}>
                                {roiString}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <TooltipTitle
                                classNames={{
                                    title: "text-sm text-foreground-500",
                                }}
                                title="PNL"
                                tooltipString="The return on investment, showing how much profit or loss the bot made compared to the initial position value."
                            />
                            <div className={`text-sm ${isPositivePnl ? "text-success" : "text-danger"}`}>
                                {pnlString}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <TooltipTitle title="Capital" classNames={{title: "text-sm text-foreground-500"}} tooltipString="The amount of capital the bot." />
                            <div className="text-sm text-foreground-500">
                                {capitalString}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <TooltipTitle title="Status" classNames={{title: "text-sm text-foreground-500"}} tooltipString="The status of the bot." />
                            {liquidityStatusChip}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <KaniImage src={chainIconUrl} className="w-5 h-5" />
                            <div className="text-sm text-foreground-500">{chainName}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-sm text-foreground-500">
                                {truncateMiddle({ str: accountAddress ?? "" })}
                            </div>
                            <div 
                                onPointerDown={(event) => event.stopPropagation()}
                                onMouseDown={(event) => event.stopPropagation()}
                                onClick={(event) => {event.stopPropagation()}}>
                                <SnippetIcon
                                    copyString={poolAddress ?? ""}
                                    classNames={{ checkIcon: "text-foreground-500 w-5 h-5", copyIcon: "text-foreground-500 w-5 h-5" }}
                                />
                            </div>
                        </div>
                    </div>
                    <UnitDropdown bot={bot} setOptimisticPerformanceDisplayMode={() => {
                        dispatch(updateBotPerformanceDisplayModeInBots({
                            id: bot.id,
                            performanceDisplayMode: bot.performanceDisplayMode === PerformanceDisplayMode.Usd ? PerformanceDisplayMode.Target : PerformanceDisplayMode.Usd,
                        }))
                    }} />
                </div>
            </KaniCardBody>
        </KaniCard>
    )
}
