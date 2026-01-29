import {
    KaniChip,
    KaniLink,
    KaniPagination,
    KaniTable,
    KaniTableBody,
    KaniTableCell,
    KaniTableColumn,
    KaniTableHeader,
    KaniTableRow
} from "@/components/atomic"
import { EmptyContent, SnippetIcon, TooltipTitle } from "@/components/reuseable"
import { explorerUrl, ExplorerType } from "@/modules/blockchain"
import { TransactionSchema, TransactionType } from "@/modules/types"
import { truncateMiddle } from "@/modules/utils"
import { useAppDispatch, useAppSelector } from "@/redux"
import { Spacer, Spinner } from "@heroui/react"
import { ArrowSquareOutIcon } from "@phosphor-icons/react"
import { dayjs } from "@/modules/dayjs"
import React, { useCallback } from "react"
import { useQueryTransactionsV2Swr } from "@/hooks/singleton"
import { setTransactionsPages } from "@/redux"
import { RefreshIcon } from "../../../../reuseable"

export const Transactions = () => {
    const dispatch = useAppDispatch()
    const transactions = useAppSelector((state) => state.bot.transactions)
    const headers = [
        {
            key: "type",
            label: "Type"
        },
        {
            key: "txHash",
            label: "Tx Hash"
        },
        {
            key: "timestamp",
            label: "Timestamp"
        },
        {
            key: "view",
            label: "View"
        },
    ]
    const renderType = (type: TransactionType) => {
        switch (type) {
        case TransactionType.OpenPosition: {
            return <KaniChip color="primary" size="sm" variant="flat">Open Position</KaniChip>
        }
        case TransactionType.ClosePosition: {
            return <KaniChip color="secondary" size="sm" variant="flat">Close Position</KaniChip>
        }
        case TransactionType.Swap: {
            return <KaniChip color="warning" size="sm" variant="flat">Swap</KaniChip>
        }
        }
    }
    const url = useCallback(
        (transaction: TransactionSchema) => explorerUrl({
            chainId: transaction.chainId,
            value: transaction.txHash,
            type: ExplorerType.Transaction,
        }), [])

    const queryTransactionsV2Swr = useQueryTransactionsV2Swr()
    const transactionsPages = useAppSelector((state) => state.bot.transactionsPages)
    return (
        <div>
            <div className="flex items-center gap-2 justify-between">
                <TooltipTitle
                    title="Transactions"
                />
                <RefreshIcon
                    classNames={{
                        icon: "text-primary"
                    }}
                    onRefresh={() => {
                        queryTransactionsV2Swr.mutate()
                    }}
                />
            </div>
            <Spacer y={4} />
            <KaniTable 
                shadow="none"
                radius="sm"
                classNames={{
                    wrapper: "min-h-[300px] p-0 bg-transparent overflow-hidden",
                }}
                bottomContent={
                    transactionsPages.totalPages && transactionsPages.totalPages > 0 ? (
                        <div className="flex w-full justify-center">
                            <KaniPagination
                                variant="flat"
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={transactionsPages.currentPage}
                                total={transactionsPages.totalPages}
                                onChange={(page) => dispatch(
                                    setTransactionsPages({
                                        currentPage: page,
                                    }
                                    )
                                )
                                }
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
                    loadingState={queryTransactionsV2Swr.isLoading ? "loading" : "idle"}
                    emptyContent={<EmptyContent description="We couldn&apos;t find any transactions." />}
                >
                    {
                        (
                            transactions || []).map((transaction) => (
                            <KaniTableRow key={transaction.id} className="border-b border-divider last:border-b-0">
                                <KaniTableCell>{renderType(transaction.type)}</KaniTableCell>
                                <KaniTableCell>
                                    <div className="flex items-center gap-2">
                                        {truncateMiddle({ str: transaction.txHash })}
                                        <SnippetIcon
                                            copyString={transaction.txHash}
                                            classNames={{
                                                checkIcon: "w-4 h-4 text-foreground-500",
                                                copyIcon: "w-4 h-4 text-foreground-500",
                                            }}/>
                                    </div>
                                </KaniTableCell>
                                <KaniTableCell>{dayjs(transaction.timestamp).format("DD/MM/YYYY HH:mm:ss")}</KaniTableCell>
                                <KaniTableCell>
                                    <KaniLink color="secondary" onPress={() => window.open(url(transaction), "_blank")}>
                                        <ArrowSquareOutIcon className="w-5 h-5 cursor-pointer" />
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