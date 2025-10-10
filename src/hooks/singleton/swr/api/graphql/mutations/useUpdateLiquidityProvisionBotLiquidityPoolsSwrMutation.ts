import { MutationUpdateLiquidityProvisionBotLiquidityPoolsRequest, mutationUpdateLiquidityProvisionBotLiquidityPools } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"

export const useUpdateLiquidityProvisionBotLiquidityPoolsSwrMutationCore = () => {
    const swrMutation = useSWRMutation(
        ["UPDATE_LIQUIDITY_PROVISION_BOT_LIQUIDITY_POOLS_SWR_MUTATION"],
        async (
            _,
            {
                arg,
            }: {
                arg: MutationUpdateLiquidityProvisionBotLiquidityPoolsRequest
            }
        ) => {
            const data = await mutationUpdateLiquidityProvisionBotLiquidityPools({
                request: arg,
            })
            return data
        }
    )
    return swrMutation
}

export const useUpdateLiquidityProvisionBotLiquidityPoolsSwrMutation = () => {
    const { updateLiquidityProvisionBotLiquidityPoolsMutation } = useContext(SwrContext)!
    return updateLiquidityProvisionBotLiquidityPoolsMutation
}
