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
import { EmptyContent, TooltipTitle } from "../../../../reuseable"
import { useAppDispatch, useAppSelector } from "@/redux"
import { Spacer, Spinner } from "@heroui/react"
import React from "react"
import { useQueryPositions2V2Swr } from "@/hooks/singleton"
import { setPositionsPages } from "@/redux"
import { computePercentage, roundNumber } from "@/modules/utils"
import { Performance } from "./Performance"
import { EyeIcon } from "@phosphor-icons/react"

export const Positions = () => {
    const queryPositions2V2Swr = useQueryPositions2V2Swr()
    const dispatch = useAppDispatch()
    const positions = useAppSelector((state) => state.bot.positions)
    const positionsPages = useAppSelector((state) => state.bot.positionsPages)
    const headers = [
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
            key: "action",
            label: "Action"
        },
    ]
    const tokens = useAppSelector((state) => state.static.tokens)
    const dexes = useAppSelector((state) => state.static.dexes)
    const bot = useAppSelector((state) => state.bot.bot)

    return (
        <div>
            <TooltipTitle
                title="Positions"
            />
            <Spacer y={3} />
            <KaniTable 
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
                    loadingState={queryPositions2V2Swr.isLoading ? "loading" : "idle"}
                    emptyContent={<EmptyContent description="We couldn&apos;t find any transactions." />}
                >
                    {
                        (
                            positions || []).map((position) => (
                            <KaniTableRow key={position.id}>
                                <KaniTableCell>
                                    {(() => {
                                        const tokenA = tokens.find((token) => token.id === position.associatedLiquidityPool.tokenA)
                                        const tokenB = tokens.find((token) => token.id === position.associatedLiquidityPool.tokenB)
                                        const targetToken = tokenA?.id === bot?.targetToken ? tokenA : tokenB
                                        return (
                                            <div className="flex items-center gap-2">
                                                {roundNumber(position.positionValueAtOpen, 5)} {targetToken?.symbol}
                                            </div>
                                        )
                                    })()}
                                </KaniTableCell>
                                <KaniTableCell>
                                    {
                                        (() => {
                                            const tokenA = tokens.find((token) => token.id === position.associatedLiquidityPool.tokenA)
                                            const tokenB = tokens.find((token) => token.id === position.associatedLiquidityPool.tokenB)
                                            return (
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        {
                                                            (() => {
                                                                const dex = dexes.find((dex) => dex.id === position.associatedLiquidityPool.dex)
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
                                                            <div className="text-sm">{computePercentage(position.associatedLiquidityPool.fee ?? 0, 1, 5).toString()}%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })()
                                    }
                                </KaniTableCell>
                                <KaniTableCell>
                                    <Performance position={position} />
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