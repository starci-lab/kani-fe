import { TokenSchema } from "@/modules/types"
import React from "react"
import { KaniAvatar, KaniCard, KaniCardBody, KaniChip, KaniLink, KaniSkeleton } from "../../../../../atomic"
import { Spacer, cn } from "@heroui/react"
import { TooltipTitle } from "@/components"

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
        <KaniCard className="bg-content2/50 w-full border-none">
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
                    tooltipString="The usable amount of the token." 
                />
                <Spacer y={1} />
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
                <KaniLink
                    color="primary"
                    className="cursor-pointer"
                >
                    <div className="text-xs">
                        Deposit
                    </div>
                </KaniLink>
            </KaniCardBody>
        </KaniCard>
    )
}
