import React from "react"
import {
    KaniCard,
    KaniCardBody,
    KaniLink,
    KaniModal,
    KaniModalBody,
    KaniModalContent,
    KaniModalHeader,
} from "../../atomic"
import { useManageMFASettingsDisclosure } from "@/hooks/singleton"
import { ManageMFASettingsPage, setManageMFASettingsPage, useAppDispatch, useAppSelector } from "@/redux"
import { ScanQRPage } from "./ScanQRAuthenticatorAppPage"
import { ConfirmEnableAuthenticatorAppPage } from "./ConfirmEnableAuthenticatorAppPage"
import { ConfirmDisableAuthenticatorAppPage } from "./ConfirmDisableAuthenticatorAppPage"
import { Spacer } from "@heroui/react"
import { MinusCircleIcon, PasswordIcon } from "@phosphor-icons/react"
import { AuthenticationFactor } from "@/modules/types"
import pluralize from "pluralize"

export const ManageMFASettingsModal = () => {
    const { isOpen, onOpenChange } = useManageMFASettingsDisclosure()
    const authenticationConfig = useAppSelector((state) => state.static.authenticationConfig)
    const page = useAppSelector((state) => state.modals.enableMFAModal.page)
    const user = useAppSelector((state) => state.session.user)
    const dispatch = useAppDispatch()
    const renderPage = () => {
        switch (page) {
            case ManageMFASettingsPage.ScanQR: {
                return <ScanQRPage />
            }
            case ManageMFASettingsPage.ConfirmTOTP: {
                return <ConfirmEnableAuthenticatorAppPage />
            }
            case ManageMFASettingsPage.ConfirmDisable: {
                return <ConfirmDisableAuthenticatorAppPage />
            }
            case ManageMFASettingsPage.Base: {
                return <>
                    <KaniModalHeader title="Manage MFA Settings" description={
                        <div>
                            Please complete one of the following verification methods.
                        </div>
                    } />
                    <KaniModalBody>
                        {
                            authenticationConfig?.authenticationFactors.includes(AuthenticationFactor.TOTP) && (
                                <KaniCard 
                                    shadow="none"
                                    isPressable={!user?.authenticationFactors?.includes(AuthenticationFactor.TOTP)}
                                    onPress={() => {
                                        dispatch(setManageMFASettingsPage(ManageMFASettingsPage.ScanQR))
                                    }}
                                    className="h-fit bg-content2" 
                                >
                                    <KaniCardBody>
                                    <div className="flex items-center justify-between w-full">
                                        <div>
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-2">
                                                    <PasswordIcon className="w-5 h-5" />
                                                    <div className="text-sm">
                                                        Authenticator App
                                                    </div>
                                                </div>
                                            </div>
                                            <Spacer y={2} />
                                            <div className="text-xs text-foreground-500 text-left">
                                                {user?.authenticationFactors?.includes(AuthenticationFactor.TOTP) ? <div className="text-primary">Completed</div> : <div className="text-foreground-500">Not started</div>}
                                            </div>
                                        </div>
                                        {
                                            user?.authenticationFactors?.includes(AuthenticationFactor.TOTP) && (
                                                <KaniLink onPress={() => dispatch(setManageMFASettingsPage(ManageMFASettingsPage.ConfirmDisable))}>
                                                    <MinusCircleIcon className="w-5 h-5" />
                                                </KaniLink>
                                            )
                                        }
                                    </div>
                                    </KaniCardBody>
                                </KaniCard>
                            )
                        }
                        <Spacer y={3} />
                        <div className="text-xs text-foreground-500">
                            {user?.authenticationFactors?.length} of {authenticationConfig?.authenticationFactors.length} verification {pluralize("method", authenticationConfig?.authenticationFactors.length)} completed
                        </div>
                    </KaniModalBody>
                </>
            }
        }
    }

    return (
        <KaniModal
            size="sm"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <KaniModalContent>
                {renderPage()}
            </KaniModalContent>
        </KaniModal>
    )
}