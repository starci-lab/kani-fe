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
import { EmptyContent, TooltipTitle } from "@/components/reuseable"
import { ExplorerId, ExplorerUrlType, getExplorerUrl } from "@/modules/blockchain"
import { TransactionSchema, TransactionType } from "@/modules/types"
import { centerPad } from "@/modules/utils"
import { useAppDispatch, useAppSelector } from "@/redux"
import { Spacer, Spinner } from "@heroui/react"
import { ArrowSquareOutIcon } from "@phosphor-icons/react"
import { dayjs } from "@/modules/utils"
import React, { useCallback } from "react"
import { useQueryTransactionsV2Swr } from "@/hooks/singleton"
import { setCurrentTransactionsPage } from "@/redux"

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
            label: "Transaction Hash"
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
    const explorerUrl = useCallback(
        (transaction: TransactionSchema) => getExplorerUrl({
            chainId: transaction.chainId,
            value: transaction.txHash,
            type: ExplorerUrlType.Transaction,
            explorerId: ExplorerId.Solscan,
        }), []
    )
    const queryTransactionsV2Swr = useQueryTransactionsV2Swr()
    const currentTransactionsPage = useAppSelector((state) => state.bot.currentTransactionsPage)
    const transactionsPage = useAppSelector((state) => state.bot.transactionsPage)
    return (
        <div>
            <TooltipTitle
                title="Transactions"
            />
            <Spacer y={3} />
            <KaniTable 
                classNames={{
                    wrapper: "min-h-[250px] p-3",
                }}
                bottomContent={
                    transactionsPage && transactionsPage > 0 ? (
                        <div className="flex w-full justify-center">
                            <KaniPagination
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={currentTransactionsPage}
                                total={transactionsPage}
                                onChange={(page) => dispatch(setCurrentTransactionsPage(page))}
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
                            <KaniTableRow key={transaction.id}>
                                <KaniTableCell>{renderType(transaction.type)}</KaniTableCell>
                                <KaniTableCell>{centerPad(transaction.txHash, 10, 6)}</KaniTableCell>
                                <KaniTableCell>{dayjs(transaction.timestamp).format("DD/MM/YYYY HH:mm:ss")}</KaniTableCell>
                                <KaniTableCell>
                                    <KaniLink
                                        href={explorerUrl(transaction)}
                                        target="_blank"
                                        color="secondary"
                                    >
                                        <ArrowSquareOutIcon
                                            className="w-5 h-5"
                                        />
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