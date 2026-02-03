import React from "react"
import { 
    KaniModalHeader,
    KaniModalBody,
    KaniButton, 
    KaniModalFooter, 
    KaniInputOtp, 
    KaniLink
} from "../../../atomic"
import { Spacer } from "@heroui/react"
import { useEnableAuthenticatorAppFormik } from "@/hooks/singleton"
import { setManageMFASettingsPage, ManageMFASettingsPage } from "@/redux"
import { useAppDispatch } from "@/redux"

export const ConfirmEnableAuthenticatorAppPage = () => {
    const formik = useEnableAuthenticatorAppFormik()
    const dispatch = useAppDispatch()
    return (
        <>
            <KaniModalHeader
                title="Enable Authentication App"
                onPrev={() => dispatch(setManageMFASettingsPage(ManageMFASettingsPage.ScanQR))}
                description={
                    <div>
                        To enable your authentication app, please enter the code from your phone app like{" "}
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
                }
            />
            <KaniModalBody>
                <div className="grid place-items-center overflow-hidden">
                    <Spacer y={4} />
                    <KaniInputOtp
                        variant="flat"
                        length={6}
                        value={formik.values.totp}
                        onValueChange={(value) => formik.setFieldValue("totp", value)}
                        onBlur={() => formik.setFieldTouched("totp", true)}
                        errorMessage={formik.errors.totp}
                        isInvalid={!!(formik.errors.totp && formik.touched.totp)}
                    />
                </div>
            </KaniModalBody>
            <KaniModalFooter>
                <KaniButton
                    color="primary"
                    fullWidth
                    isDisabled={!formik.isValid}
                    isLoading={formik.isSubmitting}
                    onPress={
                        async () => {
                        await formik.submitForm()
                    }}
                >
                    Submit
                </KaniButton>
            </KaniModalFooter>
        </>
    )
}