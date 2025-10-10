import { TooltipTitle, KaniTooltip, KaniLink, KaniImage, KaniSnippet, runGraphQLWithToast } from "@/components"
import { Spacer } from "@heroui/react"
import { QrCodeIcon, ArrowSquareOutIcon, KeyIcon } from "@phosphor-icons/react"
import React from "react"
import { ChainId } from "@/modules/types"
import { getChainAssets } from "@/assets"
import { centerPad } from "@/modules/utils"
import { ExplorerId, getExplorerUrl, ExplorerUrlType } from "@/modules/blockchain"
import { useDepositModalDisclosure, useConfirmTOTPDisclosure, useExportPrivateKeyModalDisclosure, useQueryExportedAccountSwrMutation, useConfirmTotpFormik } from "@/hooks/singleton"
import { useAppDispatch, useAppSelector, setExportPrivateKey } from "@/redux"
    
export const WalletSection = () => {
    const dispatch = useAppDispatch()
    const liquidityProvisionBot = useAppSelector((state) => state.session.liquidityProvisionBot)
    const chainAssets = getChainAssets(liquidityProvisionBot?.chainId ?? ChainId.Solana)

    const { onOpen } = useDepositModalDisclosure()
    const { onOpen: onOpenConfirmTOTP } = useConfirmTOTPDisclosure()
    const { onOpen: onOpenExportPrivateKey } = useExportPrivateKeyModalDisclosure()
    const formik = useConfirmTotpFormik()
    const queryExportedAccountSwrMutation = useQueryExportedAccountSwrMutation()

    const handleExportPrivateKey = () => {
        formik.setFieldValue("next", async (totp: string) => {
            await runGraphQLWithToast(async () => {
                const response = await queryExportedAccountSwrMutation.trigger(totp)
                const privateKey = response?.data?.exportedAccount?.data?.privateKey
                if (!privateKey) throw new Error("Failed to export private key")
                if (!response?.data?.exportedAccount) throw new Error("Failed to export private key")
                dispatch(setExportPrivateKey(privateKey))
                onOpenExportPrivateKey()
                return response.data.exportedAccount
            }, {
                showSuccessToast: false,
                showErrorToast: true,
            })
        })
        onOpenConfirmTOTP()
    }

    const explorerUrl = getExplorerUrl({
        chainId: liquidityProvisionBot?.chainId ?? ChainId.Solana,
        value: liquidityProvisionBot?.accountAddress ?? "",
        type: ExplorerUrlType.AccountAddress,
        explorerId: ExplorerId.SuiVision,
    })

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
                    {centerPad(liquidityProvisionBot?.accountAddress ?? "", 10, 6)}
                </div>
            </div>

            <Spacer y={4} />

            {/* Wallet Actions */}
            <div className="flex items-center gap-2">
                <KaniTooltip content="Copy Address">
                    <KaniSnippet
                        value={liquidityProvisionBot?.accountAddress ?? ""}
                        classNames={{ icon: "w-5 h-5" }}
                    />
                </KaniTooltip>

                <KaniTooltip content="Deposit">
                    <KaniLink onPress={onOpen}>
                        <QrCodeIcon className="w-5 h-5 cursor-pointer" />
                    </KaniLink>
                </KaniTooltip>

                <KaniTooltip content="View on Explorer">
                    <KaniLink href={explorerUrl} target="_blank">
                        <ArrowSquareOutIcon className="w-5 h-5 cursor-pointer" />
                    </KaniLink>
                </KaniTooltip>

                <KaniTooltip content="Export Private Key">
                    <KaniLink onPress={handleExportPrivateKey}>
                        <KeyIcon className="w-5 h-5 cursor-pointer" />
                    </KaniLink>
                </KaniTooltip>
            </div>
        </div>
    )
}