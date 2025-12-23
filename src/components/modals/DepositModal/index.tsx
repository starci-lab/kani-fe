import React, { useMemo } from "react"
import { 
    KaniModal, 
    KaniModalContent, 
    KaniModalHeader, 
    KaniModalBody, 
    KaniImage, 
    KaniSnippet 
} from "../../atomic"
import { useDepositModalDisclosure } from "@/hooks/singleton"
import { QRCode } from "../../reuseable"
import { useAppSelector } from "@/redux"
import { getChainAssets } from "@/assets"
import { ChainId } from "@/modules/types"
import { Spacer } from "@heroui/react"
import { 
    centerPad 
} from "@/modules/utils"
import { getChainMetadata } from "@/modules"

export const DepositModal = () => {
    const { isOpen, onOpenChange } = useDepositModalDisclosure()
    const bot = useAppSelector((state) => state.bot.bot)
    const chainAssets = useMemo(() => getChainAssets(bot?.chainId ?? ChainId.Solana), [bot?.chainId])
    const chainMetadata = useMemo(() => getChainMetadata(bot?.chainId ?? ChainId.Solana), [bot?.chainId])
    return (
        <KaniModal size="xs" isOpen={isOpen} onOpenChange={onOpenChange}>
            <KaniModalContent>
                <KaniModalHeader 
                    title="Deposit" 
                    description="Be careful when transferring funds. We cannot recover assets sent to the wrong address." 
                />
                <KaniModalBody>
                    <div className="flex flex-col items-center justify-center">
                        <QRCode 
                            size={150}
                            data={bot?.accountAddress ?? ""} />
                        <Spacer y={2} />
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <KaniImage className="w-5 h-5" src={chainAssets.token} />
                                <div className="text-sm">
                                    {chainMetadata.name}
                                </div>
                            </div>
                            |
                            <KaniSnippet
                                codeString={bot?.accountAddress ?? ""} 
                                hideSymbol
                            >
                                {centerPad(bot?.accountAddress ?? "", 6, 4)}
                            </KaniSnippet>
                        </div>
                    </div>
                </KaniModalBody>
            </KaniModalContent>
        </KaniModal>
    )
}