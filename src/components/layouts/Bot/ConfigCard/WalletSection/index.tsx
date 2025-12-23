import {
    TooltipTitle,
    KaniTooltip,
    KaniLink,
    KaniImage,
    runGraphQLWithToast,
    SnippetIcon,
} from "@/components"
import { Spacer } from "@heroui/react"
import { QrCodeIcon, ArrowSquareOutIcon, KeyIcon } from "@phosphor-icons/react"
import React, { useMemo } from "react"
import { ChainId } from "@/modules/types"
import { getChainAssets } from "@/assets"
import { centerPad } from "@/modules/utils"
import {
    ExplorerId,
    getExplorerUrl,
    ExplorerUrlType,
} from "@/modules/blockchain"
import {
    useDepositModalDisclosure,
    useConfirmTOTPDisclosure,
    useExportPrivateKeyModalDisclosure,
    useConfirmTotpFormik,
    useBackupBotPrivateKeySwrMutation,
} from "@/hooks/singleton"
import { useAppDispatch, useAppSelector, setExportPrivateKey } from "@/redux"

export const WalletSection = () => {
    const dispatch = useAppDispatch()
    const liquidityProvisionBot = useAppSelector(
        (state) => state.session.liquidityProvisionBot
    )
    const chainAssets = getChainAssets(
        liquidityProvisionBot?.chainId ?? ChainId.Solana
    )
    const bot = useAppSelector((state) => state.bot.bot)
    const { onOpen } = useDepositModalDisclosure()
    const { onOpen: onOpenConfirmTOTP } = useConfirmTOTPDisclosure()
    const { onOpen: onOpenExportPrivateKey } =
    useExportPrivateKeyModalDisclosure()
    const formik = useConfirmTotpFormik()
    const backupBotPrivateKeySwrMutation = useBackupBotPrivateKeySwrMutation()

    const handleExportPrivateKey = () => {
        formik.setFieldValue("next", async (totp: string) => {
            await runGraphQLWithToast(
                async () => {
                    const response = await backupBotPrivateKeySwrMutation.trigger({
                        emailOtp: formik.values.otp,
                        totp: totp,
                    })
                    const privateKey = response?.data?.backupBotPrivateKey?.data?.privateKey
                    if (!privateKey) throw new Error("Failed to export private key")
                    if (!response?.data?.backupBotPrivateKey)
                        throw new Error("Failed to export private key")
                    dispatch(setExportPrivateKey(privateKey))
                    onOpenExportPrivateKey()
                    return response.data.backupBotPrivateKey
                },
                {
                    showSuccessToast: false,
                    showErrorToast: true,
                }
            )
        })
        onOpenConfirmTOTP()
    }

    const explorerUrl = useMemo(
        () =>
            getExplorerUrl({
                chainId: bot?.chainId ?? ChainId.Solana,
                value: bot?.accountAddress ?? "",
                type: ExplorerUrlType.AccountAddress,
                explorerId: ExplorerId.SuiVision,
            }),
        [bot?.accountAddress, bot?.chainId]
    )

    return (
        <div>
            {/* Wallet Header */}
            <TooltipTitle
                title="Wallet"
                tooltipString="The wallets of the liquidity provision bot."
            />
            <Spacer y={4} />

            {/* Wallet Address */}
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

            <Spacer y={4} />

            {/* Wallet Actions */}
            <div className="flex items-center gap-2">
                <KaniTooltip content="Copy Address">
                    <SnippetIcon
                        copyString={bot?.accountAddress ?? ""}
                        classNames={{
                            checkIcon: "text-secondary w-5 h-5",
                            copyIcon: "text-secondary w-5 h-5",
                        }}
                    />
                </KaniTooltip>
                <KaniTooltip content="Deposit">
                    <KaniLink onPress={onOpen} color="secondary">
                        <QrCodeIcon className="w-5 h-5 cursor-pointer" />
                    </KaniLink>
                </KaniTooltip>

                <KaniTooltip content="View on Explorer">
                    <KaniLink href={explorerUrl} target="_blank" color="secondary">
                        <ArrowSquareOutIcon className="w-5 h-5 cursor-pointer" />
                    </KaniLink>
                </KaniTooltip>
                <KaniTooltip content="Export Private Key">
                    <KaniLink onPress={handleExportPrivateKey} color="secondary">
                        <KeyIcon className="w-5 h-5 cursor-pointer" />
                    </KaniLink>
                </KaniTooltip>
            </div>
        </div>
    )
}
