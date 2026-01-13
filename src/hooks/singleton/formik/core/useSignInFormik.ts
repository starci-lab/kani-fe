import { useFormik } from "formik"
import * as Yup from "yup"
import { runGraphQLWithToast } from "@/components/toasts"
import { useVerifySignInOtpSwrMutation } from "../../swr"
import { useSignInDisclosure } from "../../discloresure"
import { setAccessToken, useAppDispatch } from "@/redux"
import { setSignInModalPage, SignInPage } from "@/redux"

export interface SignInFormikValues {
    email: string
    otp: string
}

const initialValues: SignInFormikValues = {
    email: "",
    otp: "",
}

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    otp: Yup.string().required("OTP is required"),
})

export const useSignInFormikCore = () => {
    const dispatch = useAppDispatch()
    const verifySignInOtpMutation = useVerifySignInOtpSwrMutation()
    const { onClose } = useSignInDisclosure()
    return useFormik<SignInFormikValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm, setFieldError }) => {
            if (!values.email) {
                throw new Error("Email is required")
            }
            const success = await runGraphQLWithToast(
                async () => {
                    const response = await verifySignInOtpMutation.trigger({
                        email: values.email,
                        otp: values.otp,
                    })
                    if (!response.data?.verifySignInOtp) {
                        throw new Error("Failed to verify OTP")
                    }
                    if (!response.data.verifySignInOtp.success) {
                        return response.data.verifySignInOtp
                    }
                    if (!response.data.verifySignInOtp.data?.accessToken) {
                        throw new Error("Access token is required")
                    }
                    dispatch(
                        setAccessToken(
                            response.data.verifySignInOtp.data.accessToken
                        )
                    )
                    return response.data.verifySignInOtp
                }, 
                {
                    showSuccessToast: true,
                    showErrorToast: true,
                })
            if (success) {
                onClose()
                dispatch(setSignInModalPage(SignInPage.InputOTP))
                resetForm()
            } else {
                setFieldError("otp", "Invalid OTP")
            }
        },
    })
}
