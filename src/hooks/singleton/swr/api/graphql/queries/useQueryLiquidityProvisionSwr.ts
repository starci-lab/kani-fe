import { queryLiquidityProvisionBot } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"
import { setLiquidityProvisionBot, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"

export const useQueryLiquidityProvisionSwrCore = () => {
    const dispatch = useAppDispatch()
    const id = useAppSelector((state) => state.session.liquidityProvisionBot?.id)
    const totpVerified = useAppSelector((state) => state.session.totpVerified)
    // if id and totpVerified are not null, then return the id
    const swrMutation = useSWR(
        (id && totpVerified) ? ["QUERY_LIQUIDITY_PROVISION_SWR_MUTATION", id] : null,
        async () => {
            if (!id) {
                throw new Error("Id is required")
            }
            const data = await queryLiquidityProvisionBot({
                request: {
                    id,
                },
            })
            const liquidityProvisionBot = data.data?.liquidityProvisionBot
            if (!liquidityProvisionBot) {
                throw new Error("Liquidity provision bot not found")
            }
            dispatch(setLiquidityProvisionBot(liquidityProvisionBot.data!))
            return data
        }
    )
    return swrMutation
}

export const useQueryLiquidityProvisionSwr = () => {
    const { queryLiquidityProvision } = useContext(SwrContext)!
    return queryLiquidityProvision
}
