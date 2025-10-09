import React from "react"
import { ConnectModal } from "./ConnectModal"
import { DepositModal } from "./DepositModal"
import { ConfirmTOTPModal } from "./ConfirmTOTPModal"
import { ExportPrivateKeyModal } from "./ExportPrivateKeyModal"

export const ModalContainer = () => {
    return (
        <>
            <ConnectModal />
            <DepositModal />
            <ConfirmTOTPModal />
            <ExportPrivateKeyModal />
        </>
    )
}