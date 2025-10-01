import {
    KaniButton,
    KaniCardBody,
    KaniCardFooter,
    KaniCardHeader,
    KaniInputOtp,
} from "../../../atomic"
import React from "react"
import { EnableTOTPCardPage, setEnableTOTPCard, useAppDispatch, useAppSelector } from "@/redux"
import { Spacer } from "@heroui/react"
import { useEnableTotpFormik } from "@/hooks/singleton"

export const VerifyTOTP = () => {
    const user = useAppSelector((state) => state.session.user)
    const secret = user?.temporaryTotpToken
    const issuer = "Kani"
    const label = user?.email || "example@gmail.com"
    const otpAuthUri = `otpauth://totp/${encodeURIComponent(
        issuer
    )}:${encodeURIComponent(label)}?secret=${secret}&issuer=${encodeURIComponent(
        issuer
    )}`
    const dispatch = useAppDispatch()
    const enableTotpFormik = useEnableTotpFormik()
    return (
        <>
            <KaniCardHeader
                title="Verify TOTP"
                description={
                    <div>
                        Please enter the code from your phone app
                    </div>
                }
            />
            <KaniCardBody>
                <Spacer y={6} />
                <div className="flex justify-center w-full">
                    <KaniInputOtp length={6} 
                        value={enableTotpFormik.values.otp} 
                        onValueChange={(value) => {
                            enableTotpFormik.setFieldValue("otp", value)
                        }}
                        errorMessage={
                            enableTotpFormik.errors.otp
                        }
                        isInvalid={!!(enableTotpFormik.errors.otp && enableTotpFormik.touched.otp)}
                        onBlur={() => {
                            enableTotpFormik.setFieldTouched("otp", true)
                        }}
                     />
                </div>
                <Spacer y={6} />
            </KaniCardBody>
            <KaniCardFooter className="flex flex-row gap-2">
                <KaniButton fullWidth color="default" variant="flat" onPress={() => {
                    dispatch(setEnableTOTPCard(EnableTOTPCardPage.ScanTOTP))
                }}>
                    Back
                </KaniButton>
                <KaniButton fullWidth color="primary"
                isDisabled={!enableTotpFormik.isValid}
                isLoading={enableTotpFormik.isSubmitting}
                onPress={() => {
                    enableTotpFormik.handleSubmit()
                }}>
                    Confirm
                </KaniButton>
            </KaniCardFooter>
        </>
    )
}