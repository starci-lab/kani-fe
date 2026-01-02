import { KaniCard, KaniCardBody, KaniImage, KaniButton, KaniTooltip } from "@/components/atomic"
import { TooltipTitle, SnippetIcon } from "@/components/reuseable"
import { centerPad } from "@/modules/utils"
import { Spacer } from "@heroui/react"
import React, { useMemo } from "react"
import { setExportPrivateKey, setVerifyModalOnAction, useAppDispatch, useAppSelector, VerifyModalOnActionParams } from "@/redux"
import { getChainAssets } from "@/assets"
import { ChainId } from "@/modules/types"
import {
    QrCodeIcon, 
    EyeIcon, 
    FloppyDiskBackIcon 
} from "@phosphor-icons/react"
import { useDepositModalDisclosure, useExportPrivateKeyModalDisclosure, useVerifyDisclosure } from "@/hooks/singleton"
import { useBackupBotPrivateKeySwrMutation, useQueryBotSwr } from "@/hooks/singleton"
import { runGraphQLWithToast } from "@/components/toasts"
import { ExplorerId, getExplorerUrl, ExplorerUrlType } from "@/modules/blockchain"

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
    const { onOpen } = useDepositModalDisclosure()
    const { onOpen: onOpenVerify } = useVerifyDisclosure()
    const { onOpen: onOpenExportPrivateKey } = useExportPrivateKeyModalDisclosure()
    const backupBotPrivateKeySwrMutation = useBackupBotPrivateKeySwrMutation()
    const queryBotSwr = useQueryBotSwr()
    const dispatch = useAppDispatch()

    const explorerUrl = useMemo(() => getExplorerUrl({
        chainId: bot?.chainId ?? ChainId.Solana,
        value: bot?.accountAddress ?? "",
        type: ExplorerUrlType.AccountAddress,
        explorerId: bot?.explorerId ?? ExplorerId.Solscan,
    }), [bot?.accountAddress, bot?.chainId, bot?.explorerId])

    const actions: Array<WalletAction> = [
        {
            label: "Deposit",
            icon: QrCodeIcon,
            color: "default",
            tooltip: "Generate a QR code or address to deposit funds into this bot.",
            onPress: () => {
                onOpen()
            },
        },
        {
            label: "View on Explorer",
            icon: EyeIcon,
            color: "default",
            tooltip: "Open this bot's wallet address on the blockchain explorer.",
            onPress: () => {
                window.open(explorerUrl, "_blank")
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
                dispatch(
                    setVerifyModalOnAction(
                        async ({ emailOtp, totp }: VerifyModalOnActionParams) => {
                            const success = await runGraphQLWithToast(
                                async () => {
                                    const response = await backupBotPrivateKeySwrMutation.trigger({
                                        emailOtp,
                                        totp,
                                    })
                                    if (!response.data?.backupBotPrivateKey) {
                                        throw new Error("Failed to backup bot private key")
                                    }
                                    dispatch(setExportPrivateKey(
                                        response.data.backupBotPrivateKey.data?.privateKey ?? "")
                                    )
                                    await queryBotSwr.mutate()
                                    return response.data.backupBotPrivateKey
                                },
                                {
                                    showSuccessToast: false,
                                    showErrorToast: true,
                                }
                            )
                            if (success) {
                                onOpenExportPrivateKey()
                            }
                            return success
                        }
                    ))
                onOpenVerify()
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
            </KaniCardBody>
        </KaniCard>
    )
}