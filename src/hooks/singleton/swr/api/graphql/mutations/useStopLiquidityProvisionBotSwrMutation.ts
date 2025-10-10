import { MutationStopLiquidityProvisionBotRequest, mutationStopLiquidityProvisionBot } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"

export const useStopLiquidityProvisionBotSwrMutationCore = () => {
    const swrMutation = useSWRMutation(
        ["STOP_LIQUIDITY_PROVISION_BOT_SWR_MUTATION"],
        async (
            _,
            {
                arg,
            }: {
                arg: MutationStopLiquidityProvisionBotRequest
            }
        ) => {
            const data = await mutationStopLiquidityProvisionBot({
                request: arg,
            })
            return data
        }
    )
    return swrMutation
}

export const useStopLiquidityProvisionBotSwrMutation = () => {
    const { stopLiquidityProvisionBotMutation } = useContext(SwrContext)!
    return stopLiquidityProvisionBotMutation
}
