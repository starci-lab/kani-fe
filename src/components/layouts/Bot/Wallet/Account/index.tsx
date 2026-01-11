import { 
    KaniImage, 
    KaniButton, 
    KaniTooltip, 
    KaniLink,
    KaniSkeleton,
} from "../../../../atomic"
import { TooltipTitle, SnippetIcon } from "../../../../reuseable"
import { centerPad } from "@/modules/utils"
import { Spacer } from "@heroui/react"
import React, { useMemo } from "react"
import {
    useAppSelector, 
} from "@/redux"
import { getChainAssets } from "@/assets"
import { ChainId } from "@/modules/types"
import {
    QrCodeIcon, 
    FloppyDiskBackIcon 
} from "@phosphor-icons/react"
import { 
    ExplorerId, 
    getExplorerUrl, 
    ExplorerUrlType 
} from "@/modules/blockchain"
import { ArrowSquareOutIcon } from "@phosphor-icons/react"
import { usePrivy, useFundWallet } from "@privy-io/react-auth"
import { useQueryBotSwr } from "@/hooks/singleton"

export interface WalletAction {
    label: string
    icon: React.ElementType
    color: "default" | "danger"
    onPress: () => void
    disabled?: boolean
    tooltip?: string
}

export const Account = () => {
    const bot = useAppSelector((state) => state.bot.bot)
    const chainAssets = useMemo(() => getChainAssets(bot?.chainId ?? ChainId.Solana), [bot?.chainId])
    const { exportWallet } = usePrivy()
    const { fundWallet } = useFundWallet()
    const explorerUrl = useMemo(() => getExplorerUrl({
        chainId: bot?.chainId ?? ChainId.Solana,
        value: bot?.accountAddress ?? "",
        type: ExplorerUrlType.AccountAddress,
        explorerId: bot?.explorerId ?? ExplorerId.Solscan,
    }), [bot?.accountAddress, bot?.chainId, bot?.explorerId])
    const queryBotSwr = useQueryBotSwr()
    const actions: Array<WalletAction> = [
        {
            label: "Deposit",
            icon: QrCodeIcon,
            color: "default",
            tooltip: "Generate a QR code or address to deposit funds into this bot.",
            onPress: () => {
                if (!bot?.accountAddress) return
                fundWallet(
                    {
                        address: bot.accountAddress,
                        options: {
                            chain: {
                                id: 2,
                            },
                        },
                    })
            },
        },
        {
            label: "Export Private Key",
            icon: FloppyDiskBackIcon,
            color: "danger",
            disabled: bot?.backupPrivateKey,
            tooltip: bot?.backupPrivateKey
                ? "Private key has already been exported."
                : "Export the bot's private key. Keep it secure and never share it.",
            onPress: () => {
                // dispatch(
                //     setVerifyModalOnAction(
                //         async ({ emailOtp, totp }: VerifyModalOnActionParams) => {
                //             const success = await runGraphQLWithToast(
                //                 async () => {
                //                     const response = await backupBotPrivateKeySwrMutation.trigger({
                //                         emailOtp,
                //                         totp,
                //                     })
                //                     if (!response.data?.backupBotPrivateKey) {
                //                         throw new Error("Failed to backup bot private key")
                //                     }
                //                     dispatch(setExportPrivateKey(
                //                         response.data.backupBotPrivateKey.data?.privateKey ?? "")
                //                     )
                //                     await queryBotSwr.mutate()
                //                     return response.data.backupBotPrivateKey
                //                 },
                //                 {
                //                     showSuccessToast: false,
                //                     showErrorToast: true,
                //                 }
                //             )
                //             if (success) {
                //                 onOpenExportPrivateKey()
                //             }
                //             return success
                //         }
                //     ))
                // onOpenVerify()
                exportWallet()
            },
        }
    ]
    return (
        <div>
            <TooltipTitle
                title="Account" />
            <Spacer y={3} />
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-3">
                    {
                        queryBotSwr.isLoading ? (
                            <KaniSkeleton className="w-14 h-14 min-w-10 min-h-10 rounded-full"/>
                        ) : (
                            <KaniImage
                                removeWrapper
                                className="w-14 h-14 min-w-10 min-h-10"
                                src={chainAssets.token}
                            />
                        )
                    }
                    <div>
                        {
                            queryBotSwr.isLoading ? (
                                <KaniSkeleton className="h-5 w-[100px] rounded-md"/>
                            ) : (
                                <div className="text-sm">
                                    {centerPad(bot?.accountAddress ?? "", 6, 4)}
                                </div>
                            )}
                        <Spacer y={1} />
                        <div className="flex items-center gap-2">
                            <SnippetIcon
                                copyString={bot?.accountAddress ?? ""}
                                classNames={{ checkIcon: "w-4 h-4 text-foreground-500", copyIcon: "w-4 h-4 text-foreground-500" }}
                            />
                            <KaniLink onPress={() => window.open(explorerUrl, "_blank")}>
                                <ArrowSquareOutIcon className="w-4 h-4 cursor-pointer text-foreground-500" />
                            </KaniLink>
                        </div>
                    </div>
                </div>  
            </div>
            <Spacer y={4} />
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