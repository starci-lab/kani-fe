import { queryStatic } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { useAppDispatch, setTokens, setDexes, setLiquidityPools, setAccountLimits } from "@/redux"
import useSWR from "swr"

export const useQueryStaticSwrCore = () => {
    const dispatch = useAppDispatch()
    const swr = useSWR(
        ["QUERY_STATIC_SWR"],
        async () => {
            const data = await queryStatic({})
            const tokens = data.data?.tokens
            const liquidityPools = data.data?.liquidityPools
            const dexes = data.data?.dexes
            const accountLimits = data.data?.accountLimits
            if (!tokens || !tokens.data) {
                throw new Error("Tokens not found")
            }
            if (!liquidityPools || !liquidityPools.data) {
                throw new Error("Liquidity pools not found")
            }
            if (!dexes || !dexes.data) {
                throw new Error("Dexes not found")
            }
            dispatch(setTokens(tokens.data))
            dispatch(setLiquidityPools(liquidityPools.data))
            dispatch(setDexes(dexes.data))
            if (accountLimits && accountLimits.data) {
                dispatch(setAccountLimits(accountLimits.data))
            }
            return data
        }
    )
    return swr
}

export const useQueryStaticSwr = () => {
    const { queryStaticSwr } = use(SwrContext)!
    return queryStaticSwr
}