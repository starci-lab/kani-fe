import { useCreateBotFormik, useSelectTokenDisclosure } from "@/hooks/singleton"
import { 
    KaniModal, 
    KaniModalContent, 
    KaniModalHeader, 
    KaniModalBody, 
    KaniButton, 
    KaniModalFooter,
    KaniInput,
    KaniLink, 
} from "@/components/atomic"
import React, { useMemo } from "react"
import { useAppSelector } from "@/redux"
import { Spacer } from "@heroui/react"
import { FadersIcon } from "@phosphor-icons/react"
import { TokenNotFound } from "./TokenNotFound"
import { TokensScrollShadow } from "./TokensScrollShadow"

export const SelectTokenModal = () => {
    const { isOpen, onOpenChange } = useSelectTokenDisclosure()
    const tokens = useAppSelector(state => state.static.tokens)
    const formik = useCreateBotFormik()
    const filteredTokens = useMemo(() => {
        return tokens.filter(token => token.chainId === formik.values.chainId)
    }, [formik.values.chainId, tokens])
    return (
        <KaniModal isOpen={isOpen} onOpenChange={onOpenChange}>
            <KaniModalContent>
                <KaniModalHeader title="Select Token" />
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
                        placeholder="Search for a token"
                        className="w-full"
                    />
                    <Spacer y={4} />
                    {!filteredTokens.length ? <TokenNotFound /> : <TokensScrollShadow/>}
                </KaniModalBody>
                <KaniModalFooter>
                    <KaniButton variant="flat" fullWidth onPress={onOpenChange}>Close</KaniButton>
                </KaniModalFooter>
            </KaniModalContent>
        </KaniModal>
    )
}