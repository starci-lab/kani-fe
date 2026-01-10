import { queryTransactionsV2 } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { setTransactions, setTransactionsCursor, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"

export const useQueryTransactionsV2SwrCore = () => {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const id = useAppSelector((state) => state.bot.id)
    const cursor = useAppSelector((state) => state.bot.transactionsCursor)
    const swr = useSWR(
        // deprecated
        null,
        async () => {
            if (!id) {
                throw new Error("Id is required")
            }
            const data = await queryTransactionsV2({
                token: accessToken,
                request: {
                    botId: id,
                    filters: {
                        timestampAscending: false,
                        cursor: cursor || "",
                        limit: 10,
                    },
                },
            })
            const transactions = data.data?.transactionsV2
            if (!transactions) {
                throw new Error("TransactionsV2 not found")
            }
            if (!transactions.data) {
                throw new Error("TransactionsV2 data not found")
            }
            dispatch(setTransactionsCursor(transactions.data.cursor))
            dispatch(setTransactions(transactions.data.data))
            return data
        }
    )
    return swr
}

export const useQueryTransactionsV2Swr = () => {
    const { queryTransactions2V2Swr } = use(SwrContext)!
    return queryTransactions2V2Swr
}
