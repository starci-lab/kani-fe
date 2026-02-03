import { 
    KaniModalHeader, 
    KaniLink, 
    KaniModalBody, 
    KaniInputOtp,
    KaniModalFooter,
    KaniButton 
} from "../../../atomic"
import React from "react"
import { useVerifyFormik } from "@/hooks/singleton"
import { setVerifyModalPage, VerifyPage } from "@/redux"
import { useAppDispatch } from "@/redux"
export const AuthenticatorAppPage = () => {
    const formik = useVerifyFormik()
    const dispatch = useAppDispatch()
    return (
        <>
                <KaniModalHeader
                    onPrev={() => {
                        dispatch(setVerifyModalPage(VerifyPage.Base))
                    }}
                    title="Authenticator App Verification" description={
                    <div>
                     Please enter the code from your phone app like
                        <KaniLink
                            className="text-xs"
                            color="primary"
                            underline="always"
                            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                            target="_blank"
                        >
                         Google Authenticator
                        </KaniLink>
                     &nbsp;or&nbsp;
                        <KaniLink
                            className="text-xs"
                            color="primary"
                            underline="always"
                            href="https://authy.com/"
                            target="_blank"
                        >
                         Authy
                        </KaniLink>
                     .
                    </div>
                } />
                <KaniModalBody>
                    <div className="flex flex-col items-center justify-center">
                        <KaniInputOtp
                            value={formik.values.authenticatorAppCodeInput}
                            onValueChange={(value) => {
                                formik.setFieldValue("authenticatorAppCodeInput", value)
                            }}
                            length={6}
                            errorMessage={formik.errors.authenticatorAppCodeInput}
                            isInvalid={!!(formik.errors.authenticatorAppCodeInput && formik.touched.authenticatorAppCodeInput)}
                            onBlur={() => {
                                formik.setFieldTouched("authenticatorAppCodeInput", true)
                            }}
                        />
                    </div>
                </KaniModalBody>
                <KaniModalFooter>
                    <KaniButton 
                        isDisabled={!!formik.errors.authenticatorAppCodeInput}
                        fullWidth 
                        color="primary"
                        onPress={
                            async () => {
                                formik.setFieldValue("authenticatorAppCode", formik.values.authenticatorAppCodeInput)
                                dispatch(setVerifyModalPage(VerifyPage.Base))
                            }
                        }>
                        Confirm
                    </KaniButton>
                </KaniModalFooter>
        </>
    )
}