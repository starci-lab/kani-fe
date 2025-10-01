import { ChainId } from "@/common"
import { KaniButton } from "@/components"
import { useAddLiquidityProvisionBotSwrMutation } from "@/hooks/singleton"
import React from "react"

export const AddLiquidityProvisionBot = () => {
    const addLiquidityProvisionBotMutation = useAddLiquidityProvisionBotSwrMutation()
    return <KaniButton 
        isLoading={addLiquidityProvisionBotMutation.isMutating} 
        onPress={() => {
            addLiquidityProvisionBotMutation.trigger({
                chainId: ChainId.Sui,
            })
        }}>Click me</KaniButton>
}
