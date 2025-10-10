import { MutationUpdateLiquidityProvisionBotExplorerIdRequest, mutationUpdateLiquidityProvisionBotExplorerId } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"

export const useUpdateLiquidityProvisionBotExplorerIdSwrMutationCore = () => {
    const swrMutation = useSWRMutation(
        ["UPDATE_LIQUIDITY_PROVISION_BOT_EXPLORER_ID_SWR_MUTATION"],
        async (
            _,
            {
                arg,
            }: {
                arg: MutationUpdateLiquidityProvisionBotExplorerIdRequest
            }
        ) => {
            const data = await mutationUpdateLiquidityProvisionBotExplorerId({
                request: arg,
            })
            return data
        }
    )
    return swrMutation
}

export const useUpdateLiquidityProvisionBotExplorerIdSwrMutation = () => {
    const { updateLiquidityProvisionBotExplorerIdMutation } = useContext(SwrContext)!
    return updateLiquidityProvisionBotExplorerIdMutation
}
