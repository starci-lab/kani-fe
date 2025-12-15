import { TokenSchema } from "@/modules/types"
import React from "react"
import { KaniAvatar, KaniChip, KaniLink } from "@/components"
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
}

export const TokenCard = ({ 
    token, 
    type, 
    balanceAmount 
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
        <div className="bg-content2 rounded-large min-w-[200px]">
            <div className="px-3 py-2">
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
                <div className={cn(
                    "text-2xl font-bold"
                )}>
                    {balanceAmount}
                </div>
                <KaniLink
                    color="primary"
                    className="cursor-pointer"
                >
                    <div className="text-xs">
                        Deposit
                    </div>
                </KaniLink>
            </div>
        </div>
    )
}
