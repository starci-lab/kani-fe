import React from "react"
import { 
    KaniModalHeader, 
    KaniModalBody, 
    KaniButton, 
    KaniModalFooter, 
    KaniInputOtp, 
    KaniLink
} from "@/components/atomic"
import { useVerifyFormik } from "@/hooks/singleton"
import { useAppDispatch } from "@/redux"
import { runGraphQLWithToast } from "@/components/toasts"
import { Spacer } from "@heroui/react"
import { useRequestSend2FactorOtpSwrMutation } from "@/hooks/singleton"
import { setVerifyModalPage, VerifyPage } from "@/redux"
export const EmailPage = () => {
    const formik = useVerifyFormik()
    const dispatch = useAppDispatch()
    const requestSend2FactorOtpMutation = useRequestSend2FactorOtpSwrMutation()
    return (
        <>
        <KaniModalHeader 
        title="Email Verification" 
        onPrev={() => {
            dispatch(setVerifyModalPage(VerifyPage.Base))
        }}
        description={
                    <div>
                     Please enter the verification code sent to your email to continue.
                    </div>
                } />
                <KaniModalBody>
                <div className="flex flex-col items-center justify-center">
                        <KaniInputOtp
                            value={formik.values.emailCodeInput}
                            onValueChange={(value) => {
                                formik.setFieldValue("emailCodeInput", value)
                            }}
                            length={6}
                            errorMessage={formik.errors.emailCodeInput}
                            isInvalid={!!(formik.errors.emailCodeInput && formik.touched.emailCodeInput)}
                            onBlur={() => {
                                formik.setFieldTouched("emailCodeInput", true)
                            }}
                        />
                    </div>
                </KaniModalBody>
                <KaniModalFooter>
                <div className="grid place-items-center w-full">
                <KaniButton
                    color="primary"
                    fullWidth
                    isDisabled={!!formik.errors.emailCodeInput}
                    onPress={
                        async () => {
                            formik.setFieldValue("emailCode", formik.values.emailCodeInput)
                            dispatch(setVerifyModalPage(VerifyPage.Base))
                    }}
                >
                    Submit
                </KaniButton>
                <Spacer y={4} />
                    <div className="text-xs">
                        Didn't get an email?{" "}
                        <KaniLink
                            className="text-xs cursor-pointer"
                            color="primary"
                            underline="always"
                            onPress={async () => {
                                await runGraphQLWithToast(
                                    async () => {
                                        const { data } = await requestSend2FactorOtpMutation.trigger()
                                        if (!data?.requestSend2FactorOtp) {
                                            throw new Error("Failed to request Send 2 Factor OTP")
                                        }
                                        return data?.requestSend2FactorOtp
                                    }, 
                                    {
                                        showSuccessToast: false,
                                        showErrorToast: true,
                                    },
                                )
                            }}
                        >
                            Resend code
                        </KaniLink>
                    </div>
                    </div>
                </KaniModalFooter>
        </>
    )
}