import { MutationInitializeLiquidityProvisionBotRequest, mutationInitializeLiquidityProvisionBot } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"

export const useInitializeLiquidityProvisionBotSwrMutationCore = () => {
    const swrMutation = useSWRMutation(
        ["INITIALIZE_LIQUIDITY_PROVISION_BOT_SWR_MUTATION"],
        async (
            _,
            {
                arg,
            }: {
                arg: MutationInitializeLiquidityProvisionBotRequest
            }
        ) => {
            const data = await mutationInitializeLiquidityProvisionBot({
                request: arg,
            })
            return data
        }
    )
    return swrMutation
}

export const useInitializeLiquidityProvisionBotSwrMutation = () => {
    const { initializeLiquidityProvisionBotMutation } = useContext(SwrContext)!
    return initializeLiquidityProvisionBotMutation
}