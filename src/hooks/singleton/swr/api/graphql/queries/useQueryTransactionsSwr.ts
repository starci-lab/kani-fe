import { queryTransactions } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"
import { setTransactions, setTransactionsCursor, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"

export const useQueryTransactionsSwrCore = () => {
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
            const data = await queryTransactions({
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
            const transactions = data.data?.transactions
            if (!transactions) {
                throw new Error("Transactions not found")
            }
            if (!transactions.data) {
                throw new Error("Transactions data not found")
            }
            dispatch(setTransactionsCursor(transactions.data.cursor))
            dispatch(setTransactions(transactions.data.data))
            return data
        }
    )
    return swr
}

export const useQueryTransactionsSwr = () => {
    const { queryTransactionsSwr } = useContext(SwrContext)!
    return queryTransactionsSwr
}
