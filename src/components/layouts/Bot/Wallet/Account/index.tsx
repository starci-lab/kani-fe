import { KaniCard, KaniCardBody, KaniImage, KaniButton } from "@/components/atomic"
import { TooltipTitle, SnippetIcon } from "@/components/reuseable"
import { centerPad } from "@/modules/utils"
import { Spacer } from "@heroui/react"
import React, { useMemo } from "react"
import { useAppSelector } from "@/redux"
import { getChainAssets } from "@/assets"
import { ChainId } from "@/modules/types"
import {
    QrCodeIcon, 
    EyeIcon, 
    FloppyDiskBackIcon 
} from "@phosphor-icons/react"
import { useDepositModalDisclosure } from "@/hooks/singleton"

export interface WalletAction {
    label: string
    icon: React.ElementType
    onPress: () => void
}

export const Account = () => {
    const bot = useAppSelector((state) => state.bot.bot)
    const chainAssets = useMemo(() => getChainAssets(bot?.chainId ?? ChainId.Solana), [bot?.chainId])
    const { onOpen } = useDepositModalDisclosure()
    const actions: Array<WalletAction> = [
        {
            label: "Deposit",
            icon: QrCodeIcon,
            onPress: () => {
            },
        },
        {
            label: "View on Explorer",
            icon: EyeIcon,
            onPress: () => {
            },
        },
        {
            label: "Export Private Key",
            icon: FloppyDiskBackIcon,
            onPress: () => {
                onOpen()
            },
        }
    ]
    return (
        <KaniCard>
            <KaniCardBody>
                <TooltipTitle
                    title="Account"
                    tooltipString="The account address of the bot." />
                <Spacer y={4} />
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <KaniImage
                            removeWrapper
                            className="w-5 h-5 min-w-5 min-h-5"
                            src={chainAssets.token}
                        />
                        <div className="text-sm">
                            {centerPad(bot?.accountAddress ?? "", 6, 4)}
                        </div>
                    </div>
                    <SnippetIcon
                        copyString={bot?.accountAddress ?? ""}
                        classNames={{ checkIcon: "w-5 h-5", copyIcon: "w-5 h-5" }}
                    />
                </div>
                <Spacer y={4} />
                <div className="flex items-center gap-2">
                    {actions.map((action) => (
                        <KaniButton 
                            color="default" 
                            variant="flat" 
                            onPress={action.onPress}
                            isIconOnly 
                            key={action.label}
                        >
                            <action.icon className="w-5 h-5" />
                        </KaniButton>
                    ))}
                </div>  
            </KaniCardBody>
        </KaniCard>
    )
}