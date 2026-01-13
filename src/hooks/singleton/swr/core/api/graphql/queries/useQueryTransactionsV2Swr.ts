import { queryTransactionsV2 } from "@/modules/api"
import { setTransactions, setTransactionsPages, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const TRANSACTIONS_V2_PAGE_SIZE = 20
export const useQueryTransactionsV2SwrCore = () => {
    const dispatch = useAppDispatch()
    const { getAccessToken, authenticated } = usePrivy()
    const id = useAppSelector((state) => state.bot.id)
    const filters = useAppSelector((state) => state.bot.transactionsFilters)
    const swr = useSWR(
        authenticated ? ["QUERY_TRANSACTIONS_V2_SWR", authenticated, filters] : null,
        async () => {
            if (!id) {
                throw new Error("Id is required")
            }
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await queryTransactionsV2({
                token: accessToken,
                request: {
                    botId: id,
                    filters
                },
            })
            const transactions = data.data?.transactionsV2
            if (!transactions) {
                throw new Error("TransactionsV2 not found")
            }
            if (!transactions.data) {
                throw new Error("TransactionsV2 data not found")
            }
            dispatch(setTransactions(transactions.data.data))
            dispatch(
                setTransactionsPages({
                    currentPage: filters.pageNumber || 1,
                    totalPages: Math.ceil(transactions.data.count / TRANSACTIONS_V2_PAGE_SIZE),
                }
                )
            )
            return data
        }
    )
    return swr
}
