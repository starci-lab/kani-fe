import { queryTransactions2V2 } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { setTransactions, setTransactionsPage, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"
import { usePrivy } from "@privy-io/react-auth"

export const useQueryTransactions2V2SwrCore = () => {
    const dispatch = useAppDispatch()
    const { getAccessToken, authenticated } = usePrivy()
    const id = useAppSelector((state) => state.bot.id)
    const page = useAppSelector((state) => state.bot.transactionsPage)
    const swr = useSWR(
        authenticated ? ["QUERY_TRANSACTIONS2_V2_SWR", authenticated] : null,
        async () => {
            if (!id) {
                throw new Error("Id is required")
            }
            const accessToken = await getAccessToken()
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await queryTransactions2V2({
                token: accessToken,
                request: {
                    botId: id,
                    filters: {
                        pageNumber: page || 1,
                        limit: 10,
                    },
                },
            })
            const transactions = data.data?.transactions2V2
            if (!transactions) {
                throw new Error("Transactions2V2 not found")
            }
            if (!transactions.data) {
                throw new Error("Transactions2V2 data not found")
            }
            dispatch(setTransactions(transactions.data.data))
            dispatch(setTransactionsPage(transactions.data.count))
            return data
        }
    )
    return swr
}

export const useQueryTransactions2V2Swr = () => {
    const { queryTransactions2V2Swr } = use(SwrContext)!
    return queryTransactions2V2Swr
}
