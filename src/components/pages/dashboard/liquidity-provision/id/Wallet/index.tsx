import { getChainAssets } from "@/assets"
import { KaniCard, KaniCardBody, KaniImage, KaniLink, KaniSnippet, KaniTooltip, TooltipTitle, runGraphQLWithToast } from "@/components"
import { ChainId } from "@/modules/types"
import { setExportPrivateKey, useAppSelector } from "@/redux"
import { centerPad } from "@/modules/utils"
import { useAppDispatch } from "@/redux"
import { Spacer } from "@heroui/react"
import React from "react"
import { ArrowSquareOutIcon, KeyIcon, QrCodeIcon } from "@phosphor-icons/react"
import { useConfirmTOTPDisclosure, useConfirmTotpFormik, useDepositModalDisclosure, useQueryExportedAccountSwrMutation } from "@/hooks/singleton"
import { useExportPrivateKeyModalDisclosure } from "@/hooks/singleton"

export const Wallet = () => {
    const liquidityProvisionBot = useAppSelector(
        (state) => state.session.liquidityProvisionBot
    )
    const chainAssets = getChainAssets(liquidityProvisionBot?.chainId ?? ChainId.Solana)
    const { onOpen } = useDepositModalDisclosure()
    const { onOpen: onOpenConfirmTOTP } = useConfirmTOTPDisclosure()
    const formik = useConfirmTotpFormik()
    const queryExportedAccountSwrMutation = useQueryExportedAccountSwrMutation()
    const { onOpen: onOpenExportPrivateKey } = useExportPrivateKeyModalDisclosure()
    const dispatch = useAppDispatch()
    return (
        <KaniCard>
            <KaniCardBody>
                <TooltipTitle title="Wallet" tooltipString="The wallets of the liquidity provision bot." />
                <Spacer y={4} />
                <div className="flex items-center gap-2">
                    <KaniImage removeWrapper className="w-5 h-5 min-w-5 min-h-5" src={chainAssets.token} />
                    <div className="text-sm">
                        {centerPad(liquidityProvisionBot?.accountAddress ?? "", 20, 10) }
                    </div>
                </div>
                <Spacer y={4} />
                <div className="flex items-center gap-2">
                    {/* Copy Address */}
                    <KaniTooltip content="Copy Address">
                        <KaniSnippet 
                            value={liquidityProvisionBot?.accountAddress ?? ""} 
                            classNames={{ icon: "w-5 h-5" }} 
                        />
                    </KaniTooltip>
                    {/* Deposit via QR */}
                    <KaniTooltip content="Deposit">
                        <KaniLink
                            onPress={onOpen}
                        >
                            <QrCodeIcon className="w-5 h-5 cursor-pointer" />
                        </KaniLink>
                    </KaniTooltip>
                    {/* Open on Solscan */}
                    <KaniTooltip content="View on explorer">
                        <KaniLink
                            href={`https://${liquidityProvisionBot?.chainId}.solscan.io/account/${liquidityProvisionBot?.accountAddress}`}
                            target="_blank"
                        >
                            <ArrowSquareOutIcon className="w-5 h-5 cursor-pointer" />
                        </KaniLink>
                    </KaniTooltip>
                    {/* Export Private Key */}
                    <KaniTooltip content="Export Private Key">
                        <KaniLink color="danger" onPress={
                            () => {
                                formik.setFieldValue(
                                    "next", 
                                    async (totp: string) => {
                                        await runGraphQLWithToast(
                                            async () => {
                                                const response = await queryExportedAccountSwrMutation.trigger(totp)
                                                if (!response?.data?.exportedAccount) {
                                                    throw new Error("Failed to export private key")
                                                }
                                                if (!response.data.exportedAccount.data) {
                                                    throw new Error("Failed to export private key")
                                                }
                                                const { privateKey } = response.data.exportedAccount.data
                                                dispatch(setExportPrivateKey(privateKey))
                                                onOpenExportPrivateKey()
                                                // return to complete the fn, no use
                                                return response.data.exportedAccount
                                            },
                                            {
                                                showSuccessToast: false,
                                                showErrorToast: true,
                                            }
                                        )
                                    })
                                onOpenConfirmTOTP()
                            }}>
                            <KeyIcon className="w-5 h-5 cursor-pointer" />
                        </KaniLink>
                    </KaniTooltip>
                </div>
            </KaniCardBody>
        </KaniCard>
    )
}