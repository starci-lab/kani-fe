import React, { useMemo } from "react"
import {
    KaniModal,
    KaniModalContent,
    KaniModalHeader,
    KaniModalBody,
    KaniImage,
    KaniDivider
} from "../../atomic"
import { useDepositDisclosure } from "@/hooks/singleton"
import { QRCode, SnippetIcon, TooltipTitle } from "../../reuseable"
import { setDepositModalTokenId, useAppDispatch, useAppSelector } from "@/redux"
import { getChainAssets } from "@/resources/assets"
import { ChainId, TokenId } from "@/modules/types"
import { Spacer } from "@heroui/react"
import {
    truncateMiddle
} from "@/modules/utils"
import { getChainConfig } from "@/resources/config"

export const DepositModal = () => {
    const { isOpen, onOpenChange } = useDepositDisclosure()
    const bot = useAppSelector((state) => state.bot.bot)
    const tokens = useAppSelector((state) => state.static.tokens)
    const depositModalTokenId = useAppSelector((state) => state.modals.deposit.tokenId)
    const token = useMemo(() => tokens.find((token) => token.displayId === depositModalTokenId), [tokens, depositModalTokenId])
    const chainAssets = useMemo(() => getChainAssets(bot?.chainId ?? ChainId.Solana), [bot?.chainId])
    const chainConfig = useMemo(() => getChainConfig(bot?.chainId ?? ChainId.Solana), [bot?.chainId])
    const dispatch = useAppDispatch()
    return (
        <KaniModal size="xs" isOpen={isOpen} onOpenChange={onOpenChange} onClose={
            () => {
                dispatch(setDepositModalTokenId())
                onOpenChange()
            }
        }>
            <KaniModalContent>
                <KaniModalHeader
                    title="Deposit"
                    description="Be careful when transferring funds. We cannot recover assets sent to the wrong address."
                />
                <KaniModalBody>
                    <div className="flex flex-col items-center justify-center">
                        <QRCode
                            size={150}
                            data={bot?.accountAddress ?? ""} 
                            icon={token ? 
                            <KaniImage className="w-8 h-8" src={token?.iconUrl ?? ""} /> 
                            : <KaniImage className="w-8 h-8" src={chainConfig.iconUrl ?? ""} /> }
                        />
                        <Spacer y={4} />
                        <KaniDivider />
                        <Spacer y={3} />
                        <div className="flex items-center justify-between gap-4 w-full">
                            <TooltipTitle title="Network" />
                            <div className="flex items-center gap-1 ">
                                <KaniImage className="w-5 h-5" src={chainAssets.token} />
                                <div className="text-sm">
                                    {chainConfig.name}
                                </div>
                            </div>
                        </div>
                        <Spacer y={3} />
                        <div className="flex items-center justify-between gap-4 w-full">
                            <TooltipTitle title="Deposit Address" />
                            <div className="flex items-center gap-1 ">
                                <div className="text-sm">
                                    {truncateMiddle({ str: bot?.accountAddress ?? "" })}
                                </div>
                                {bot?.accountAddress && (
                                <SnippetIcon
                                    copyString={bot?.accountAddress ?? ""}
                                    classNames={{
                                        checkIcon: "w-4 h-4 text-foreground-500",
                                        copyIcon: "w-4 h-4 text-foreground-500",
                                    }}
                                />
                                )}
                            </div>
                        </div>
                        {
                            token?.tokenAddress && (
                                <>
                                    <Spacer y={3} />
                                    <div className="flex items-center justify-between gap-4 w-full">
                                        <TooltipTitle title="Token Address" />
                                        <div className="flex items-center gap-1 ">
                                            <div className="text-sm">
                                                {truncateMiddle({ str: token?.tokenAddress ?? "" })}
                                            </div>
                                            <SnippetIcon
                                                copyString={bot?.accountAddress ?? ""}
                                                classNames={{
                                                    checkIcon: "w-4 h-4 text-foreground-500",
                                                    copyIcon: "w-4 h-4 text-foreground-500",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </>
                            )
                        }

                    </div>
                </KaniModalBody>
            </KaniModalContent>
        </KaniModal>
    )
}