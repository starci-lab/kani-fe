import {
    KaniCard,
    KaniCardBody,
    KaniChip,
    KaniLink,
    KaniTable,
    KaniTableBody,
    KaniTableCell,
    KaniTableColumn,
    KaniTableHeader,
    KaniTableRow
} from "@/components/atomic"
import { TooltipTitle } from "@/components/reuseable"
import { ExplorerId, ExplorerUrlType, getExplorerUrl } from "@/modules/blockchain"
import { TransactionSchema, TransactionType } from "@/modules/types"
import { centerPad } from "@/modules/utils"
import { useAppSelector } from "@/redux"
import { Spacer } from "@heroui/react"
import { ArrowSquareOutIcon } from "@phosphor-icons/react"
import { dayjs } from "@/modules/utils"
import React, { useCallback } from "react"

export const Transactions = () => {
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
    return (
        <KaniCard>
            <KaniCardBody>
                <TooltipTitle
                    title="Transactions"
                    tooltipString="The transactions of the bot."
                />
                <Spacer y={4} />
                <KaniTable shadow="none" classNames={{ wrapper: "p-0" }}>
                    <KaniTableHeader>
                        {headers.map((header) => (
                            <KaniTableColumn key={header.key}>{header.label}</KaniTableColumn>
                        ))}
                    </KaniTableHeader>
                    <KaniTableBody>
                        {(transactions || []).map((transaction) => (
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
                        ))}
                    </KaniTableBody>
                </KaniTable>
            </KaniCardBody>
        </KaniCard>
    )
}