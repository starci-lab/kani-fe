import { TokenId, TokenSchema } from "@/modules/types"
import React from "react"
import { KaniAvatar, KaniCard, KaniCardBody, KaniChip, KaniLink, KaniSkeleton } from "../../../../../atomic"
import { Spacer, cn } from "@heroui/react"
import { TooltipTitle } from "@/components"
import { useDepositDisclosure } from "@/hooks/singleton"
import { useAppDispatch, setDepositModalTokenId } from "@/redux"

export enum TokenCardType {
    TargetToken = "targetToken",
    QuoteToken = "quoteToken",
    GasToken = "gasToken",
}

export interface TokenCardProps {
    token?: TokenSchema
    type: TokenCardType
    balanceAmount: string
    isLoading: boolean
}

export const TokenCard = ({ 
    token, 
    type, 
    balanceAmount,
    isLoading
}: TokenCardProps) => {
    const dispatch = useAppDispatch()
    const depositDisclosure = useDepositDisclosure()
    const renderChips = () => {
        switch (type) {
        case TokenCardType.TargetToken: {
            return <KaniChip color="primary" size="sm" variant="flat">
                Target
            </KaniChip>
        }
        case TokenCardType.QuoteToken: {
            return <KaniChip color="secondary" size="sm" variant="flat">
                Quote
            </KaniChip>
        }
        case TokenCardType.GasToken: {
            return <KaniChip color="default" size="sm" variant="flat">
                Gas
            </KaniChip>
        }
        }
    }
    return (
        <KaniCard className="w-full">
            <KaniCardBody className="px-3 py-2">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <KaniAvatar src={token?.iconUrl}/>
                        <div>
                            <div className="text-sm">{token?.name}</div>
                            <div className="text-xs text-foreground-500">{token?.symbol}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {renderChips()}
                    </div>
                </div>
                <Spacer y={2} />
                <TooltipTitle 
                    classNames={{
                        title: "text-xs text-foreground-500", 
                    }}
                    title="Usable Amount" 
                />
                <Spacer y={2} />
                {
                    isLoading ? (
                        <KaniSkeleton className="h-5 w-[50px] my-1 rounded-md"/>
                    ) : (
                        <div className={cn(
                            "text-xl font-bold"
                        )}>
                            {balanceAmount} {token?.symbol}
                        </div>
                    )   
                }
                <Spacer y={1} />
                <KaniLink
                    color="primary"
                    className="cursor-pointer"
                    onPress={
                        () => {
                            dispatch(setDepositModalTokenId(token?.displayId ?? TokenId.SolNative))
                            depositDisclosure.onOpen()
                        }
                    }
                >
                    <div className="text-xs">
                        Deposit
                    </div>
                </KaniLink>
            </KaniCardBody>
        </KaniCard>
    )
}
