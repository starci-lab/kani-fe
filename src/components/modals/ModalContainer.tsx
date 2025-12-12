import React from "react"
import { ConnectModal } from "./ConnectModal"
import { DepositModal } from "./DepositModal"
import { ConfirmTOTPModal } from "./ConfirmTOTPModal"
import { ExportPrivateKeyModal } from "./ExportPrivateKeyModal"
import { UpdateExplorerModal } from "./UpdateExplorerModal"
import { SelectPoolsModal } from "./SelectPoolsModal"

export const ModalContainer = () => {
    return (
        <>
            <ConnectModal />
            <DepositModal />
            <ConfirmTOTPModal />
            <ExportPrivateKeyModal />
            <UpdateExplorerModal />
            <SelectPoolsModal />
        </>
    )
}