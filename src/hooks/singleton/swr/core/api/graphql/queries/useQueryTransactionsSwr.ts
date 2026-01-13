import { queryTransactions } from "@/modules/api"
import { setTransactions, setTransactionsPages, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"

export const TRANSACTIONS_PAGE_SIZE = 20
export const useQueryTransactionsSwrCore = () => {
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector((state) => state.session.accessToken)
    const id = useAppSelector((state) => state.bot.id)
    const filters = useAppSelector((state) => state.bot.transactionsFilters)
    const isDisabled = true
    const swr = useSWR(
        isDisabled ? null : (id && accessToken) ? ["QUERY_TRANSACTIONS_SWR", id, filters] : null,
        async () => {
            if (!id) {
                throw new Error("Id is required")
            }
            const data = await queryTransactions({
                token: accessToken,
                request: {
                    botId: id,
                    filters
                },
            })
            const transactions = data.data?.transactions
            if (!transactions) {
                throw new Error("Transactions not found")
            }
            if (!transactions.data) {
                throw new Error("Transactions data not found")
            }
            dispatch(setTransactions(transactions.data.data))
            dispatch(setTransactionsPages({
                currentPage: filters.pageNumber || 1,
                totalPages: Math.ceil(transactions.data.count / TRANSACTIONS_PAGE_SIZE),
            }))
            return data
        }
    )
    return swr
}
