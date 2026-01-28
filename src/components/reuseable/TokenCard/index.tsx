import React from "react"
import { TokenSchema } from "@/modules/types"
import {
    KaniAvatar,
    KaniCard,
    KaniCardBody,
    KaniBadge,
} from "@/components/atomic"
import { truncateMiddle } from "@/modules/utils"
import { cn } from "@heroui/react"
import { SnippetIcon } from "../SnippetIcon"
import { SealCheckIcon } from "@phosphor-icons/react"

export interface TokenCardProps {
  token: TokenSchema;
  onSelect: (token: TokenSchema) => void;
  isSelected: boolean;
  isOtherSideSelected: boolean;
  isDisabled: boolean;
  isPrimarySide: boolean;
}

export const TokenCard = ({
    token,
    onSelect,
    isSelected,
    isOtherSideSelected,
    isDisabled,
    isPrimarySide,
}: TokenCardProps) => {
    const renderContent = () => {
        return (
            <KaniCard
                isDisabled={isDisabled}
                onPress={() => onSelect(token)}
                isPressable={!isDisabled}
                shadow="none"
                className={cn(
                    "bg-content2 w-full",
                    isPrimarySide ?
                        {
                            "ring-2 ring-primary": isSelected,
                            "ring-2 ring-secondary": isOtherSideSelected,
                        } :
                        {
                            "ring-2 ring-secondary": isSelected,
                            "ring-2 ring-primary": isOtherSideSelected,
                        }
                )}
            >
                <KaniCardBody>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 grid grid-cols-3">
                            <div className="flex items-center gap-2">
                                <KaniAvatar
                                    src={token.iconUrl}
                                    classNames={{
                                        base: "w-10 h-10 min-w-10 min-h-10",
                                    }}
                                    radius="full"
                                />
                                <div className="flex flex-col gap-1">
                                    <div className="text-sm">{token.name}</div>
                                    <div className="text-xs text-foreground-500">
                                        {token.symbol}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {token.tokenAddress && (
                            <div className="flex items-center gap-2"  
                                onClick={
                                    (event) => {
                                        event.stopPropagation()
                                    }
                                }>
                                <div className="text-sm text-foreground-500">{truncateMiddle({ str: token.tokenAddress ?? "" })}</div>
                                <SnippetIcon copyString={token.tokenAddress ?? ""} classNames={{ checkIcon: "w-5 h-5 text-foreground-500", copyIcon: "w-5 h-5 text-foreground-500" }}/>
                            </div>
                        )}
                    </div>
                </KaniCardBody>
            </KaniCard>
        )
    }
    return (
        isSelected || isOtherSideSelected ? (
            <KaniBadge content={
                <SealCheckIcon weight="fill" className={
                    cn(
                        "w-6 h-6 min-w-6 min-h-6 max-w-6 max-h-6", 
                        isPrimarySide ?
                            {
                                "text-primary": isSelected,
                                "text-secondary": isOtherSideSelected,
                            }
                            :
                            {
                                "text-secondary": isSelected,
                                "text-primary": isOtherSideSelected,
                            }
                    )
                } />
            } placement="top-left" classNames={{
                badge: "top-1 left-1 min-w-4 min-h-4 max-w-4 max-h-4 bg-foreground border-none",
            }}>
                {renderContent()}
            </KaniBadge>
        ) : renderContent()
    )
}
