import React from "react"
import { ConnectModal } from "./ConnectModal"
import { DepositModal } from "./DepositModal"
import { ConfirmTOTPModal } from "./ConfirmTOTPModal"
import { ExportPrivateKeyModal } from "./ExportPrivateKeyModal"
import { SelectPoolsModal } from "./SelectPoolsModal"
import { SelectTokenModal } from "./SelectTokenModal"
import { SignInModal } from "./SignInModal"
import { EnableMFAModal } from "./EnableMFAModal"
import { VerifyModal } from "./VerifyModal"
import { PositionModal } from "./PositionModal"
import { MenuModal } from "./MenuModal"

export const ModalContainer = () => {
    return (
        <>
            <ConnectModal />
            <DepositModal />
            <ConfirmTOTPModal />
            <ExportPrivateKeyModal />
            <SelectPoolsModal />
            <SelectTokenModal />
            <SignInModal />
            <EnableMFAModal />
            <VerifyModal />
            <PositionModal />
            <MenuModal />
        </>
    )
}