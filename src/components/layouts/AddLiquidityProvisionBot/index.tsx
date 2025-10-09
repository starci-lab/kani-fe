import { ChainId } from "@/modules/types"
import { KaniButton } from "@/components"
import { useAddLiquidityProvisionBotSwrMutation } from "@/hooks/singleton"
import React from "react"

export const AddLiquidityProvisionBot = () => {
    const addLiquidityProvisionBotMutation = useAddLiquidityProvisionBotSwrMutation()
    return <KaniButton 
        isLoading={addLiquidityProvisionBotMutation.isMutating} 
        onPress={() => {
            addLiquidityProvisionBotMutation.trigger({
                chainId: ChainId.Solana,
            })
        }}>Click me</KaniButton>
}
