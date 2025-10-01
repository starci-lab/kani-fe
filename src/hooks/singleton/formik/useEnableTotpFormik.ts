import { useFormik } from "formik"
import * as Yup from "yup"
import { useContext } from "react"
import { FormikContext } from "./FormikContext"
import { useConfirmOtpSwrMutation } from "../swr"
import { runGraphQLWithToast } from "@/components"
import { MutationHeadersKey } from "@/modules/api"

// Form values type — only one field for the 6-digit OTP code
export interface EnableTotpFormikValues {
    otp: string
}

// Validation schema for the OTP form
const enableTotpValidationSchema = Yup.object({
    otp: Yup.string()
        .length(6, "OTP must be exactly 6 digits")
        .matches(/^\d+$/, "OTP must contain only digits")
        .required("OTP is required"),
})

// Core hook — creates the Formik instance for the TOTP form
export const useEnableTotpFormikCore = () => {
    const confirmOtpMutation = useConfirmOtpSwrMutation()
    return useFormik<EnableTotpFormikValues>({
        initialValues: {
            otp: "",
        },
        validationSchema: enableTotpValidationSchema,
        onSubmit: async (values) => {
            await runGraphQLWithToast(async () => {
                const response = await confirmOtpMutation.trigger({
                    headers: {
                        [MutationHeadersKey.TOTP]: values.otp,
                    },
                })
                if (!response.data?.confirmTotp) {
                    throw new Error("Failed to verify TOTP")
                }
                return response.data.confirmTotp
            })
        },
    })
}

// Context hook — retrieves the Formik instance from the FormikProvider
export const useEnableTotpFormik = () => {
    const { enableTotpFormik } = useContext(FormikContext)!
    return enableTotpFormik
}