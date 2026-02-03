
import { queryStatic } from "@/modules/api"
import { 
    useAppDispatch, 
    setTokens, 
    setDexes, 
    setAccountLimits, 
    setGasConfig, 
    setBalanceConfig, 
    setSocketTokenIds,
    setAuthenticationConfig
} from "@/redux"
import useSWR from "swr"

export const useQueryStaticSwrCore = () => {
    const dispatch = useAppDispatch()
    const swr = useSWR(
        ["QUERY_STATIC_SWR"],
        async () => {
            const data = await queryStatic({})
            const tokens = data.data?.tokens
            const dexes = data.data?.dexes
            const accountLimits = data.data?.accountLimits
            const gasConfig = data.data?.gasConfig
            const balanceConfig = data.data?.balanceConfig
            const authenticationConfig = data.data?.authenticationConfig
            if (!tokens || !tokens.data) {
                throw new Error("Tokens not found")
            }
            if (!dexes || !dexes.data) {
                throw new Error("Dexes not found")
            }
            dispatch(setTokens(tokens.data))
            dispatch(setSocketTokenIds(tokens.data.map((token) => token.id)))
            dispatch(setDexes(dexes.data))
            if (accountLimits && accountLimits.data) {
                dispatch(setAccountLimits(accountLimits.data))
            }
            if (gasConfig && gasConfig.data) {
                dispatch(setGasConfig(gasConfig.data))
            }
            if (balanceConfig && balanceConfig.data) {
                dispatch(setBalanceConfig(balanceConfig.data))
            }
            if (authenticationConfig && authenticationConfig.data) {
                dispatch(setAuthenticationConfig(authenticationConfig.data))
            }
            return data
        }
    )
    return swr
}
