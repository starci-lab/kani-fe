import React from "react"
import { ConnectModal } from "./ConnectModal"
import { DepositModal } from "./DepositModal"
import { ConfirmTOTPModal } from "./ConfirmTOTPModal"
import { ExportPrivateKeyModal } from "./ExportPrivateKeyModal"
import { SignInModal } from "./SignInModal"
import { EnableMFAModal } from "./EnableMFAModal"
import { VerifyModal } from "./VerifyModal"
import { PositionModal } from "./PositionModal"
import { MenuModal } from "./MenuModal"
import { SortByModal } from "./SortByModal"

export const ModalContainer = () => {
    return (
        <>
            <ConnectModal />
            <DepositModal />
            <ConfirmTOTPModal />
            <ExportPrivateKeyModal />
            <SignInModal />
            <EnableMFAModal />
            <VerifyModal />
            <PositionModal />
            <MenuModal />
            <SortByModal />
        </>
    )
}