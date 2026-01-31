import {
    KaniAvatar,
    KaniAvatarGroup,
    KaniImage,
    KaniLink,
    KaniPagination,
    KaniTable,
    KaniTableBody,
    KaniTableCell,
    KaniTableColumn,
    KaniTableHeader,
    KaniTableRow
} from "../../../../atomic"
import { EmptyContent, RefreshIcon, SnippetIcon, TooltipTitle, UnitDropdown } from "../../../../reuseable"
import { updateBotPositionsPerformanceDisplayMode, useAppDispatch, useAppSelector } from "@/redux"
import { Spacer, Spinner } from "@heroui/react"
import React, { useMemo } from "react"
import { useQueryPositionsV2Swr, useUpdateBotPositionsPerformanceDisplayModeV2SwrMutation } from "@/hooks/singleton"
import { setPositionsPages } from "@/redux"
import { round, computePercentage, truncateMiddle } from "@/modules/utils"
import { Performance } from "./Performance"
import { EyeIcon } from "@phosphor-icons/react"
import Decimal from "decimal.js"
import { PerformanceDisplayMode } from "@/modules/types"

export const Positions = () => {
    const bot = useAppSelector((state) => state.bot.bot)
    const queryPositionsV2Swr = useQueryPositionsV2Swr()
    const dispatch = useAppDispatch()
    const positions = useAppSelector((state) => state.bot.positions)
    const positionsPages = useAppSelector((state) => state.bot.positionsPages)
    const headers = [
        {
            key: "id",
            label: "ID"
        },
        {
            key: "value",
            label: "Value"
        },
        {
            key: "performance",
            label: "Performance"
        },
        {
            key: "pool",
            label: "Pool"
        },
        {
            key: "view",
            label: "View"
        },
    ]
    const tokens = useAppSelector((state) => state.static.tokens)
    const dexes = useAppSelector((state) => state.static.dexes)
    const updateBotPositionsPerformanceDisplayModeV2SwrMutation = useUpdateBotPositionsPerformanceDisplayModeV2SwrMutation()
    const targetToken = useMemo(() => tokens.find((token) => token.id === bot?.targetToken), [tokens, bot?.targetToken])
    if (!bot) {
        return null
    }
    if (!targetToken) {
        return null
    }
    return (
        <div>
            <div className="flex items-center gap-4 justify-between">
                <TooltipTitle
                    title="Positions"
                />
                <div className="flex items-center gap-2">   
                    <UnitDropdown 
                        targetToken={targetToken} 
                        value={bot.positionsPerformanceDisplayMode} 
                        onValueChange={
                            async (value) => {
                                dispatch(updateBotPositionsPerformanceDisplayMode({
                                    id: bot.id,
                                    positionsPerformanceDisplayMode: value,
                                }))
                                await updateBotPositionsPerformanceDisplayModeV2SwrMutation.trigger({
                                    request: {
                                        id: bot.id,
                                        positionsPerformanceDisplayMode: value,
                                    },
                                })
                            }} />
                    <RefreshIcon
                        classNames={{
                            icon: "text-primary"
                        }}
                        onRefresh={() => {
                            queryPositionsV2Swr.mutate()
                        }}
                    />
                </div>
            </div>
            <Spacer y={4} />
            <KaniTable 
                shadow="none"
                radius="sm"
                classNames={{
                    wrapper: "min-h-[300px] p-0 bg-transparent overflow-hidden",
                }}
                bottomContent={
                    positionsPages.totalPages && positionsPages.totalPages > 0 ? (
                        <div className="flex w-full justify-center">
                            <KaniPagination
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={positionsPages.currentPage}
                                total={positionsPages.totalPages}
                                onChange={(page) => dispatch(setPositionsPages({
                                    currentPage: page,
                                }))}
                            />
                        </div>
                    ) : null
                }
            >
                <KaniTableHeader>
                    {headers.map((header) => (
                        <KaniTableColumn key={header.key}>{header.label}</KaniTableColumn>
                    ))}
                </KaniTableHeader>
                <KaniTableBody 
                    loadingContent={<Spinner />}
                    loadingState={queryPositionsV2Swr.isLoading ? "loading" : "idle"}
                    emptyContent={<EmptyContent description="We couldn&apos;t find any transactions." />}
                >
                    {
                        (
                            positions || []).map((position) => (
                            <KaniTableRow key={position.id} className="border-b border-divider last:border-b-0">
                                <KaniTableCell>
                                    <div className="flex items-center gap-2">
                                        {truncateMiddle({ str: position.id, front: 4, back: 4 })}  
                                        <SnippetIcon
                                            copyString={position.id}
                                            classNames={{
                                                checkIcon: "w-5 h-5 text-foreground-500",
                                                copyIcon: "w-5 h-5 text-foreground-500",
                                            }}
                                        />  
                                    </div>
                                </KaniTableCell>
                                <KaniTableCell>
                                    {(() => {
                                        const tokenA = tokens.find((token) => token.id === position.associatedLiquidityPool?.tokenA)
                                        const tokenB = tokens.find((token) => token.id === position.associatedLiquidityPool?.tokenB)
                                        const targetToken = tokenA?.id === bot?.targetToken ? tokenA : tokenB
                                        return (
                                            <div className="flex items-center gap-2">
                                                {
                                                    (() => {
                                                        if (bot.positionsPerformanceDisplayMode === PerformanceDisplayMode.Usd) {
                                                            return  `${round(new Decimal(position.openSnapshot?.positionValueInUsd ?? 0))} USD`
                                                        } else {
                                                            return `${round(new Decimal(position.openSnapshot?.positionValue ?? 0))} ${targetToken?.symbol}`
                                                        }
                                                    })()
                                                }
                                            </div>
                                        )
                                    })()}
                                </KaniTableCell>
                                <KaniTableCell>
                                    <Performance position={position} />
                                </KaniTableCell>
                                <KaniTableCell>
                                    {
                                        (() => {
                                            const tokenA = tokens.find((token) => token.id === position.associatedLiquidityPool?.tokenA)
                                            const tokenB = tokens.find((token) => token.id === position.associatedLiquidityPool?.tokenB)
                                            return (
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        {
                                                            (() => {
                                                                const dex = dexes.find((dex) => dex.id === position.associatedLiquidityPool?.dex)
                                                                return (
                                                                    <div className="flex items-center gap-2">
                                                                        <KaniImage src={dex?.iconUrl} className="w-4 h-4" />
                                                                        <div className="text-sm">{dex?.name}</div>
                                                                    </div>
                                                                )
                                                            })()
                                                        }
                                                    </div>
                                                    <Spacer y={2} />
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <KaniAvatarGroup >
                                                                <KaniAvatar src={tokenA?.iconUrl}  classNames={{
                                                                    base: "w-5 h-5 z-10",
                                                                }} radius="full" />
                                                                <KaniAvatar src={tokenB?.iconUrl} classNames={{
                                                                    base: "w-5 h-5",
                                                                }} radius="full" />
                                                            </KaniAvatarGroup>
                                                            <div className="text-sm">{tokenA?.name}-{tokenB?.name}</div>
                                                        </div>
                                                        <div className="flex items-center gap-1 justify-end">
                                                            <div className="text-sm">{computePercentage({ numerator: new Decimal(position.associatedLiquidityPool?.fee ?? 0), denominator: new Decimal(1) }).toString()}%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })()
                                    }
                                </KaniTableCell>
                                <KaniTableCell>
                                    <KaniLink color="secondary">
                                        <EyeIcon className="w-5 h-5 cursor-pointer" />
                                    </KaniLink>
                                </KaniTableCell>
                            </KaniTableRow>
                        ))
                    }
                </KaniTableBody>
            </KaniTable>
        </div>
    )
}