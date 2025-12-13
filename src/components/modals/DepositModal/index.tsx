import React from "react"
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
import { getMetadata, centerPad } from "@/modules/utils"

export const DepositModal = () => {
    const { isOpen, onOpenChange } = useDepositModalDisclosure()
    const liquidityProvisionBot = useAppSelector((state) => state.session.liquidityProvisionBot)
    const chainAssets = getChainAssets(liquidityProvisionBot?.chainId ?? ChainId.Solana)
    const metadata = getMetadata(liquidityProvisionBot?.chainId ?? ChainId.Solana)
    return (
        <KaniModal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
            <KaniModalContent>
                <KaniModalHeader title="Deposit" description="Be careful when transferring funds. We cannot recover assets sent to the wrong address." />
                <KaniModalBody>
                    <div className="flex flex-col items-center justify-center">
                        <QRCode 
                            size={150}
                            data={liquidityProvisionBot?.accountAddress ?? ""} />
                        <Spacer y={2} />
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <KaniImage className="w-5 h-5" src={chainAssets.token} />
                                <div className="text-sm">
                                    {metadata.name}
                                </div>
                            </div>
                            |
                            <div className="flex gap-1 items-center">
                                <KaniSnippet
                                    classNames={{
                                        base: "w-5 h-5"
                                    }}
                                    value={liquidityProvisionBot?.accountAddress ?? ""} />
                                <div className="text-sm">
                                    { centerPad(liquidityProvisionBot?.accountAddress ?? "", 10, 4) }
                                </div>
                            </div>
                        </div>
                    </div>
                </KaniModalBody>
            </KaniModalContent>
        </KaniModal>
    )
}