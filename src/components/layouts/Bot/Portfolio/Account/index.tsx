import { 
    KaniImage, 
    KaniButton, 
    KaniTooltip, 
    KaniLink,
    KaniSkeleton,
    KaniChip,
} from "../../../../atomic"
import { TooltipTitle, SnippetIcon } from "../../../../reuseable"
import { truncateMiddle } from "@/modules/utils"
import { Spacer } from "@heroui/react"
import React, { useMemo } from "react"
import {
    useAppSelector, 
} from "@/redux"
import { getChainAssets } from "@/resources/assets"
import { ChainId } from "@/modules/types"
import {
    ArrowLineUpIcon,
    ArrowLineDownIcon, 
} from "@phosphor-icons/react"
import { 
    explorerUrl, 
    ExplorerType 
} from "@/modules/blockchain"
import { ArrowSquareOutIcon } from "@phosphor-icons/react"
import { 
    useDepositDisclosure, 
    useQueryBotsV2Swr,
    useWithdrawDisclosure
} from "@/hooks/singleton"

export interface WalletAction {
    label: string
    icon: React.ElementType
    color: "secondary" | "danger"
    onPress: () => void
    disabled?: boolean
    tooltip?: string
}

export const Account = () => {
    const bot = useAppSelector((state) => state.bot.bot)
    const chainAssets = useMemo(() => getChainAssets(bot?.chainId ?? ChainId.Solana), [bot?.chainId])
    const depositDisclosure = useDepositDisclosure()
    const withdrawDisclosure = useWithdrawDisclosure()
    const url = useMemo(() => explorerUrl({
        type: ExplorerType.Account,
        value: bot?.accountAddress ?? "",
        chainId: bot?.chainId ?? ChainId.Solana,
    }), [bot?.accountAddress, bot?.chainId])
    const queryBotsV2Swr = useQueryBotsV2Swr()
    const actions: Array<WalletAction> = [
        {
            label: "Deposit",
            icon: ArrowLineDownIcon,
            color: "secondary",
            tooltip: "Generate a QR code or address to deposit funds into this bot.",
            onPress: () => {
                depositDisclosure.onOpen()
            },
        },
        {
            label: "Withdraw",
            icon: ArrowLineUpIcon,
            color: "secondary",
            tooltip: "Withdraw funds from this bot.",   
            onPress: () => {
                withdrawDisclosure.onOpen()
            },
        },
    ]
    return (
        <div>
            <TooltipTitle
                title="Account" />
            <Spacer y={3} />
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-3">
                    {
                        !queryBotsV2Swr.data || queryBotsV2Swr.isLoading ? (
                            <KaniSkeleton className="w-14 h-14 min-w-10 min-h-10 rounded-full"/>
                        ) : (
                            <div className="w-14 h-14 relative rounded-full">
                                <KaniImage src={bot?.avatarUrl ?? ""} alt="Bot Avatar" className="w-14 h-14 rounded-full" />
                                <KaniImage
                                    removeWrapper
                                    className="w-7 h-7 min-w-7 min-h-7 rounded-full absolute bottom-0 right-0"
                                    src={chainAssets.token}
                                />
                            </div>
                        )
                    }
                    <div>
                        {
                            !queryBotsV2Swr.data || queryBotsV2Swr.isLoading ? (
                                <KaniSkeleton className="h-5 w-[100px] rounded-md"/>
                            ) : (
                                <div className="flex items-center gap-2"> 
                                    <div className="text-sm">
                                        {truncateMiddle({ str: bot?.accountAddress ?? "", front: 6, back: 4 })}
                                    </div>
                                    <KaniChip
                                        variant="flat"
                                        size="sm"
                                        className="text-xs"
                                    >
                                        {bot?.chainId === ChainId.Solana ? "Solana" : "Sui"}
                                    </KaniChip>
                                </div>
                            )}
                        <Spacer y={1} />
                        <div className="flex items-center gap-2">
                            <SnippetIcon
                                copyString={bot?.accountAddress ?? ""}
                                classNames={{ checkIcon: "w-5 h-5 text-foreground-500", copyIcon: "w-5 h-5 text-foreground-500" }}
                            />
                            <KaniLink onPress={() => window.open(url, "_blank")}>
                                <ArrowSquareOutIcon className="w-5 h-5 cursor-pointer text-foreground-500" />
                            </KaniLink>
                        </div>
                    </div>
                </div>  
            </div>
            <Spacer y={3} />
            <div className="flex items-center gap-2">
                {actions.map((action) => (
                    <KaniTooltip key={action.label} content={action.tooltip}>
                        <div>
                            <KaniButton 
                                color={action.color} 
                                variant="flat" 
                                isDisabled={action.disabled}
                                onPress={action.onPress}
                                isIconOnly 
                                key={action.label}
                            >
                                <action.icon className="w-5 h-5" />
                            </KaniButton>
                        </div>
                    </KaniTooltip>
                ))}
            </div>  
        </div>
    )
}