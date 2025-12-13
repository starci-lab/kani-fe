import React from "react"
import {
    KaniModalBody,
    KaniInputOtp,
    KaniModalHeader,
    KaniButton,
    KaniModalFooter,
} from "@/components/atomic"
import { Spacer } from "@heroui/react"
import { KaniLink } from "@/components/atomic"
import { setSignInModalPage, SignInPage } from "@/redux"
import { useAppDispatch } from "@/redux"
import { useSignInFormik } from "@/hooks/singleton"
import { useRequestSignInOtpSwrMutation } from "@/hooks/singleton"
import { runGraphQLWithToast } from "@/components/toasts"

export const InputOTPPage = () => {
    const dispatch = useAppDispatch()
    const formik = useSignInFormik()
    const useRequestSignInOtpSwr = useRequestSignInOtpSwrMutation()
    return (
        <>
            <KaniModalHeader
                title="Enter Confirmation Code"
                onPrev={() => dispatch(setSignInModalPage(SignInPage.InputEmail))}
                description={
                    <div>
                        Please check{" "}
                        <span className="text-primary">cuongnvtse160875@gmail.com</span>{" "}
                        for an email from kanibot.xyz and enter your code below.
                    </div>
                }
            />
            <KaniModalBody>
                <div className="grid place-items-center overflow-hidden">
                    <Spacer y={6} />
                    <KaniInputOtp
                        variant="flat"
                        length={6}
                        value={formik.values.otp}
                        onValueChange={(value) => formik.setFieldValue("otp", value)}
                        onBlur={() => formik.setFieldTouched("otp", true)}
                        errorMessage={formik.errors.otp}
                        isInvalid={!!(formik.errors.otp && formik.touched.otp)}
                    />
                </div>
            </KaniModalBody>
            <KaniModalFooter>
                <div className="grid place-items-center w-full">
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
                <Spacer y={4} />
                    <div className="text-xs">
                        Didn't get an email?{" "}
                        <KaniLink
                            className="text-xs"
                            color="primary"
                            underline="always"
                            onPress={async () => {
                                await runGraphQLWithToast(
                                    async () => {
                                        const { data } = await useRequestSignInOtpSwr.trigger({
                                            email: formik.values.email,
                                        })
                                        if (!data?.requestSignInOtp) {
                                            throw new Error("Failed to request Sign In OTP")
                                        }
                                        return data?.requestSignInOtp
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
