import React, { useMemo } from "react"
import { KaniModal, KaniModalContent, KaniModalHeader, KaniModalBody, KaniButton, KaniModalFooter } from "../../atomic"
import { useVerifyDisclosure, useVerifyFormik } from "@/hooks/singleton"
import { CaretRightIcon, PasswordIcon } from "@phosphor-icons/react"
import { Spacer } from "@heroui/react"
import { useRequestSend2FactorOtpSwrMutation } from "@/hooks/singleton"
import { runGraphQLWithToast } from "../../toasts"
import { setVerifyModalPage, VerifyPage } from "@/redux"
import { useAppDispatch, useAppSelector } from "@/redux"
import { AuthenticatorAppPage } from "./AuthenticatorAppPage"
import Decimal from "decimal.js"
export const VerifyModal = () => {
    const { isOpen, onOpenChange, onClose } = useVerifyDisclosure()
    const formik = useVerifyFormik()
    const requestSend2FactorOtpMutation = useRequestSend2FactorOtpSwrMutation()
    const page = useAppSelector(state => state.modals.verify.page)
    const dispatch = useAppDispatch()
    const isEmailCompleted = useMemo(() => {
        return formik.values.emailCode !== ""
    }, [formik.values.emailCode])
    const isAuthenticatorAppCompleted = useMemo(() => {
        return formik.values.authenticatorAppCode !== ""
    }, [formik.values.authenticatorAppCode])
    const totalCompleted = useMemo(() => {
        return new Decimal(isEmailCompleted ? 1 : 0).add(new Decimal(isAuthenticatorAppCompleted ? 1 : 0))
    }, [isEmailCompleted, isAuthenticatorAppCompleted])

    const renderPage = () => {
        switch (page) {
        case VerifyPage.Base:
            return <>
                <KaniModalHeader title="Multi-step verification" description={
                    <div>
                     Please complete the multi-step verification to continue.
                    </div>
                } />
                <KaniModalBody>
                    <KaniButton variant="flat" className="h-fit p-3" onPress={() => {
                        dispatch(setVerifyModalPage(VerifyPage.AuthenticatorApp))
                    }}>
                        <div className="flex items-center justify-between w-full">
                            <div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        <PasswordIcon className="w-5 h-5"/>
                                        <div className="text-sm">
                                    Authenticator App
                                        </div>
                                    </div>
                                </div>
                                <Spacer y={2}/>
                                <div className="text-xs text-foreground-500 text-left">
                                    {isAuthenticatorAppCompleted ? <div className="text-primary">Completed</div> : <div className="text-foreground-500">Not started</div>}                                  
                                </div>
                            </div>
                            <CaretRightIcon/>
                        </div>
                    </KaniButton>
                    <Spacer y={3}/>
                    <div className="text-xs text-foreground-500">
                        {totalCompleted.toNumber()} of 1 verification completed
                    </div>
                </KaniModalBody>
                <KaniModalFooter>
                    <KaniButton 
                        isDisabled={!formik.isValid}
                        isLoading={formik.isSubmitting}
                        fullWidth 
                        color="primary"
                        onPress={
                            async () => {
                                await formik.submitForm()
                            }
                        }>
                        Confirm
                    </KaniButton>
                </KaniModalFooter>
            </>
        case VerifyPage.AuthenticatorApp:
            return <AuthenticatorAppPage />
        }
    }
    return (
        <KaniModal size="sm" isOpen={isOpen} onOpenChange={onOpenChange} onClose={() => {
            formik.resetForm()
            onClose()
        }}>
            <KaniModalContent>
                {renderPage()}
            </KaniModalContent>
        </KaniModal>
    )
}