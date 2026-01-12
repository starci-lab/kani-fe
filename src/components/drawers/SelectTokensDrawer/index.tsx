import { 
    KaniDrawer, 
    KaniDrawerBody, 
    KaniDrawerContent, 
    KaniDrawerHeader 
} from "../../atomic"
import React, { useEffect, useMemo } from "react"
import { useCreateBotFormik, useSelectTokenDisclosure } from "@/hooks/singleton"
import { SelectTokenCard } from "./SelectTokenCard"
import { setFilteredTokens, setTokenSearchQuery, useAppDispatch, useAppSelector } from "@/redux"
import { KaniInput } from "../../atomic"

export const SelectTokensDrawer = () => {
    const { isOpen, onOpenChange } = useSelectTokenDisclosure()
    const tokens = useAppSelector(state => state.static.tokens)
    const formik = useCreateBotFormik()
    const tokenSearchQuery = useAppSelector(state => state.createBot.tokenSearchQuery)
    const dispatch = useAppDispatch()
    const originalFilteredTokens = useMemo(() => {
        return tokens.filter(token => token.chainId === formik.values.chainId)
    }, [tokens, formik.values.chainId])
    const filteredTokens = useAppSelector(state => state.createBot.filteredTokens)
    useEffect(
        () => {
            console.log("tokenSearchQuery", tokenSearchQuery)
            // if tokenSearchQuery is empty, set filteredTokens to all tokens
            const trimmedTokenSearchQuery = tokenSearchQuery.trim()
            if (!trimmedTokenSearchQuery) {
                dispatch(setFilteredTokens(originalFilteredTokens))
                return
            }
            // if searchQuery length > 10, sure that user want to find the token via address
            // else, search for the token via name or symbol
            const filteredTokens = originalFilteredTokens.filter(token => 
            {
                if (trimmedTokenSearchQuery.length > 10) {
                    return token.tokenAddress?.toLowerCase().includes(trimmedTokenSearchQuery.toLowerCase())
                }
                const isNameMatch = token.name.toLowerCase().includes(trimmedTokenSearchQuery.toLowerCase())
                const isSymbolMatch = token.symbol.toLowerCase().includes(trimmedTokenSearchQuery.toLowerCase())
                return isNameMatch || isSymbolMatch
            }
            )
            dispatch(setFilteredTokens(filteredTokens))
        }, [tokenSearchQuery, originalFilteredTokens])
    return (
        <KaniDrawer 
            isOpen={isOpen} 
            onOpenChange={onOpenChange} 
        >
            <KaniDrawerContent>
                <KaniDrawerHeader>
                    Select Tokens
                </KaniDrawerHeader>
                <KaniDrawerBody className="flex-none">
                    <KaniInput
                        placeholder="Search for a token"
                        className="w-full mb-3"
                        value={tokenSearchQuery}
                        onValueChange={(value) => {
                            dispatch(setTokenSearchQuery(value))
                        }
                        }
                    />
                </KaniDrawerBody>
                <KaniDrawerBody className="flex-1">
                    <div className="flex flex-col gap-3">
                        {
                            filteredTokens.map((token) => (
                                <SelectTokenCard key={token.id} token={token} />
                            )
                            )
                        }
                    </div>
                </KaniDrawerBody>
            </KaniDrawerContent>
        </KaniDrawer>    
    )
}