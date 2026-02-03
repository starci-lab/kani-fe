import React from "react"
import { ConnectModal } from "./ConnectModal"
import { DepositModal } from "./DepositModal"
import { ConfirmTOTPModal } from "./ConfirmTOTPModal"
import { ExportPrivateKeyModal } from "./ExportPrivateKeyModal"
import { SignInModal } from "./SignInModal"
import { ManageMFASettingsModal } from "./ManageMFASettingsModal"
import { MFAVerificationModal } from "./MFAVerificationModal"
import { PositionModal } from "./PositionModal"
import { MenuModal } from "./MenuModal"
import { SortByModal } from "./SortByModal"
import { WithdrawModal } from "./WithdrawModal"
import { RequireMFAModal } from "./RequireMFAModal"

export const ModalContainer = () => {
    return (
        <>
            <ConnectModal />
            <DepositModal />
            <ConfirmTOTPModal />
            <ExportPrivateKeyModal />
            <SignInModal />
            <ManageMFASettingsModal />
            <MFAVerificationModal />
            <PositionModal />
            <MenuModal />
            <SortByModal />
            <WithdrawModal />
            <RequireMFAModal />
        </>
    )
}