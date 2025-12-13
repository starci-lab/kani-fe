import React from "react"
import { ConnectModal } from "./ConnectModal"
import { DepositModal } from "./DepositModal"
import { ConfirmTOTPModal } from "./ConfirmTOTPModal"
import { ExportPrivateKeyModal } from "./ExportPrivateKeyModal"
import { UpdateExplorerModal } from "./UpdateExplorerModal"
import { SelectPoolsModal } from "./SelectPoolsModal"
import { SelectTokenModal } from "./SelectTokenModal"
import { SignInModal } from "./SignInModal"
import { EnableMFAModal } from "./EnableMFAModal"

export const ModalContainer = () => {
    return (
        <>
            <ConnectModal />
            <DepositModal />
            <ConfirmTOTPModal />
            <ExportPrivateKeyModal />
            <UpdateExplorerModal />
            <SelectPoolsModal />
            <SelectTokenModal />
            <SignInModal />
            <EnableMFAModal />
        </>
    )
}