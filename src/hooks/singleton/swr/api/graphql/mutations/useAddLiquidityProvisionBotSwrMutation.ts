import { MutationAddLiquidityProvisionBotRequest, mutationAddLiquidityProvisionBot } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"

export const useAddLiquidityProvisionBotSwrMutationCore = () => {
    const swrMutation = useSWRMutation(
        ["ADD_LIQUIDITY_PROVISION_BOT_SWR_MUTATION"],
        async (
            _,
            {
                arg,
            }: {
                arg: MutationAddLiquidityProvisionBotRequest
            }
        ) => {
            const data = await mutationAddLiquidityProvisionBot({
                request: arg,
            })
            return data
        }
    )
    return swrMutation
}

export const useAddLiquidityProvisionBotSwrMutation = () => {
    const { addLiquidityProvisionBotMutation } = useContext(SwrContext)!
    return addLiquidityProvisionBotMutation
}