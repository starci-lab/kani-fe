import { MutationRunLiquidityProvisionBotRequest, mutationRunLiquidityProvisionBot } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"

export const useRunLiquidityProvisionBotSwrMutationCore = () => {
    const swrMutation = useSWRMutation(
        ["RUN_LIQUIDITY_PROVISION_BOT_SWR_MUTATION"],
        async (
            _,
            {
                arg,
            }: {
                arg: MutationRunLiquidityProvisionBotRequest
            }
        ) => {
            const data = await mutationRunLiquidityProvisionBot({
                request: arg,
            })
            return data
        }
    )
    return swrMutation
}

export const useRunLiquidityProvisionBotSwrMutation = () => {
    const { runLiquidityProvisionBotMutation } = useContext(SwrContext)!
    return runLiquidityProvisionBotMutation
}
