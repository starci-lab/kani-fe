import React from "react"
import {
    KaniButton,
    KaniModalBody,
    KaniInput,
    KaniModalFooter,
    KaniModalHeader,
} from "@/components/atomic"
import { 
    SignInPage, 
    setSignInModalPage, 
    useAppDispatch 
} from "@/redux"
import { useRequestSignInOtpSwrMutation } from "@/hooks/singleton"
import { useSignInFormik } from "@/hooks/singleton"
import { runGraphQLWithToast } from "@/components/toasts"

export const InputEmailPage = () => {
    const dispatch = useAppDispatch()
    const requestSignInOtpMutation = useRequestSignInOtpSwrMutation()
    const formik = useSignInFormik()
    return (
        <>
            <KaniModalHeader 
                title="Sign In" 
                description="Enter your email address to receive a verification code from kanibot.xyz." 
            />
            <KaniModalBody>
                <KaniInput 
                isClearable
                isRequired
                placeholder="Email" 
                value={formik.values.email}
                onValueChange={(value) => formik.setFieldValue("email", value)}
                onBlur={() => formik.setFieldTouched("email", true)}
                errorMessage={formik.errors.email}
                isInvalid={!!(formik.errors.email && formik.touched.email)}
                />
            </KaniModalBody>
            <KaniModalFooter>
                <KaniButton 
                color="primary" 
                fullWidth 
                isLoading={requestSignInOtpMutation.isMutating}
                onPress={
                    async () => {
                        await runGraphQLWithToast(
                            async () => {
                            const { data } = await requestSignInOtpMutation.trigger({
                                email: formik.values.email,
                            })
                            if (!data?.requestSignInOtp) {
                                throw new Error("Failed to request Sign In OTP")
                            }
                            return data?.requestSignInOtp
                        }, {
                            showSuccessToast: false,
                            showErrorToast: true,
                        })
                        dispatch(setSignInModalPage(SignInPage.InputOTP))
                    }
                    }>
                    Submit
                </KaniButton>
            </KaniModalFooter>
        </>
    )
}
