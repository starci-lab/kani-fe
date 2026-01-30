import React from "react"
import {
    KaniButton,
    KaniModalBody,
    KaniInput,
    KaniModalFooter,
    KaniModalHeader,
    KaniLink,
} from "../../../atomic"
import {
    SignInPage,
    setSignInModalPage,
    useAppDispatch
} from "@/redux"
import { useRequestSignInOtpSwrMutation } from "@/hooks/singleton"
import { useSignInFormik } from "@/hooks/singleton"
import { runGraphQLWithToast } from "../../../toasts"

export const InputEmailPage = () => {
    const dispatch = useAppDispatch()
    const requestSignInOtpMutation = useRequestSignInOtpSwrMutation()
    const formik = useSignInFormik()
    return (
        <>
            <KaniModalHeader
                title="Sign In"
                description=<div>Enter your email address to receive a verification code from <span className="font-medium">no-reply@kanibot.xyz</span>.</div>
            />
            <KaniModalBody>
                <div>
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
                </div>
            </KaniModalBody>
            <KaniModalFooter>
                <div className="grid place-items-center w-full gap-4">
                <KaniButton
                    color="primary"
                    fullWidth
                    isLoading={requestSignInOtpMutation.isMutating}
                    onPress={
                        async () => {
                            const success = await runGraphQLWithToast(
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
                            if (success) {
                                dispatch(setSignInModalPage(SignInPage.InputOTP))
                            }
                        }
                    }>
                    Submit
                </KaniButton>
                <div className="text-xs text-foreground-500">
                    By continuing, you agree to our <KaniLink as={"button"} underline="always" className="text-xs cursor-pointer" color="primary">Terms</KaniLink> and <KaniLink as={"button"} underline="always" className="text-xs cursor-pointer" color="primary">Privacy</KaniLink>
                </div>
                </div>
            </KaniModalFooter>
        </>
    )
}
