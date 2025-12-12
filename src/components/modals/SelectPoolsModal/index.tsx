import { useCreateBotFormik, useSelectPoolsDisclosure } from "@/hooks/singleton"
import { 
    KaniModal, 
    KaniModalContent, 
    KaniModalHeader, 
    KaniModalBody, 
    KaniButton, 
    KaniModalFooter, 
    KaniInput,
    KaniLink
} from "@/components/atomic"
import React, { useMemo } from "react"
import { FadersIcon } from "@phosphor-icons/react"
import { useAppSelector } from "@/redux"
import { PoolNotFound } from "./PoolNotFound"
import { Spacer } from "@heroui/react"
import { PoolsScrollShadow } from "./PoolsScrollShadow"

export const SelectPoolsModal = () => {
    const { isOpen, onOpenChange } = useSelectPoolsDisclosure()
    const liquidityPools = useAppSelector(state => state.static.liquidityPools)
    const formik = useCreateBotFormik()
    const tokens = useAppSelector(state => state.static.tokens)
    const filteredLiquidityPools = useMemo(() => {
        return liquidityPools.filter(liquidityPool => {
            const targetToken = tokens.find((token) => token.displayId === formik.values.targetTokenId)
            const quoteToken = tokens.find((token) => token.displayId === formik.values.quoteTokenId)
            if (!targetToken || !quoteToken) {
                return false
            }
            const targetTokenId = targetToken.id
            const quoteTokenId = quoteToken.id
            const isPair = liquidityPool.tokenA === targetTokenId && liquidityPool.tokenB === quoteTokenId
            || liquidityPool.tokenA === quoteTokenId && liquidityPool.tokenB === targetTokenId
            return isPair && liquidityPool.chainId === formik.values.chainId
        })
    }, [
        liquidityPools, 
        formik.values.chainId, 
        formik.values.targetTokenId, 
        formik.values.quoteTokenId, tokens
    ])

    return (
        <KaniModal isOpen={isOpen} onOpenChange={onOpenChange}>
            <KaniModalContent>
                <KaniModalHeader title="Select Pools" />
                <KaniModalBody>
                    <KaniInput
                        endContent={
                            <KaniLink
                                as="button"
                                color="secondary"
                            >
                                <FadersIcon/>
                            </KaniLink>
                        }
                        placeholder="Search for a pool"
                        className="w-full"
                    />
                    <Spacer y={4} />
                    {!filteredLiquidityPools.length ? <PoolNotFound /> : <PoolsScrollShadow/>}
                </KaniModalBody>
                <KaniModalFooter>
                    <KaniButton variant="flat" fullWidth onPress={onOpenChange}>Close</KaniButton>
                </KaniModalFooter>
            </KaniModalContent>
        </KaniModal>
    )
}