import { queryTransactions2 } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { setTransactions, setTransactionsPage, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"

export const useQueryTransactions2SwrCore = () => {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const id = useAppSelector((state) => state.bot.id)
    const page = useAppSelector((state) => state.bot.transactionsPage)
    const isDisabled = true
    const swr = useSWR(
        isDisabled ? null : (id && accessToken) ? ["QUERY_TRANSACTIONS2_SWR", id, page] : null,
        async () => {
            if (!id) {
                throw new Error("Id is required")
            }
            const data = await queryTransactions2({
                token: accessToken,
                request: {
                    botId: id,
                    filters: {
                        pageNumber: page || 1,
                        limit: 10,
                    },
                },
            })
            const transactions = data.data?.transactions2
            if (!transactions) {
                throw new Error("Transactions2 not found")
            }
            if (!transactions.data) {
                throw new Error("Transactions2 data not found")
            }
            dispatch(setTransactions(transactions.data.data))
            dispatch(setTransactionsPage(transactions.data.count))
            return data
        }
    )
    return swr
}

export const useQueryTransactions2Swr = () => {
    const { queryTransactions2Swr } = use(SwrContext)!
    return queryTransactions2Swr
}
