import { queryStatic } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"
import { useAppDispatch, setTokens, setDexes, setLiquidityPools } from "@/redux"
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
            return data
        }
    )
    return swr
}

export const useQueryStaticSwr = () => {
    const { queryStaticSwr } = useContext(SwrContext)!
    return queryStaticSwr
}