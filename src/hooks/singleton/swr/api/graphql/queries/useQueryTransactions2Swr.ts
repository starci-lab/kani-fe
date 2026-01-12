import { queryTransactions2 } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { setTransactions, setTransactionsPages, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"

export const TRANSACTIONS_2_PAGE_SIZE = 20
export const useQueryTransactions2SwrCore = () => {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const id = useAppSelector((state) => state.bot.id)
    const filters = useAppSelector((state) => state.bot.transactionsFilters)
    const isDisabled = true
    const swr = useSWR(
        isDisabled ? null : (id && accessToken) ? ["QUERY_TRANSACTIONS2_SWR", id, filters] : null,
        async () => {
            if (!id) {
                throw new Error("Id is required")
            }
            const data = await queryTransactions2({
                token: accessToken,
                request: {
                    botId: id,
                    filters
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
            dispatch(setTransactionsPages({
                currentPage: filters.pageNumber || 1,
                totalPages: Math.ceil(transactions.data.count / TRANSACTIONS_2_PAGE_SIZE),
            }))
            return data
        }
    )
    return swr
}

export const useQueryTransactions2Swr = () => {
    const { queryTransactions2Swr } = use(SwrContext)!
    return queryTransactions2Swr
}
