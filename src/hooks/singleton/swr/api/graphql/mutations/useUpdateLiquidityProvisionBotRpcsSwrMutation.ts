import { MutationUpdateLiquidityProvisionBotRpcsRequest, mutationUpdateLiquidityProvisionBotRpcs } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"

export const useUpdateLiquidityProvisionBotRpcsSwrMutationCore = () => {
    const swrMutation = useSWRMutation(
        ["UPDATE_LIQUIDITY_PROVISION_BOT_RPCS_SWR_MUTATION"],
        async (
            _,
            {
                arg,
            }: {
                arg: MutationUpdateLiquidityProvisionBotRpcsRequest
            }
        ) => {
            const data = await mutationUpdateLiquidityProvisionBotRpcs({
                request: arg,
            })
            return data
        }
    )
    return swrMutation
}

export const useUpdateLiquidityProvisionBotRpcsSwrMutation = () => {
    const { updateLiquidityProvisionBotRpcsMutation } = useContext(SwrContext)!
    return updateLiquidityProvisionBotRpcsMutation
}
