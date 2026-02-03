import { useFormik } from "formik"
import * as Yup from "yup"
import { useEnableAuthenticatorAppV2SwrMutation, useQueryUserV2Swr } from "../../swr"
import { runGraphQLWithToast } from "@/modules/toast"
import {
    ManageMFASettingsPage,
    setManageMFASettingsPage,
    useAppDispatch,
} from "@/redux"
import { usePrivy } from "@privy-io/react-auth"

// Form values type — only one field for the 6-digit OTP code
export interface EnableAuthenticatorAppFormikValues {
    totp: string
}

// Validation schema for the OTP form
const validationSchema = Yup.object({
    totp: Yup.string()
        .length(6, "OTP must be exactly 6 digits")
        .matches(/^\d+$/, "OTP must contain only digits")
        .required("OTP is required"),
})

const initialValues: EnableAuthenticatorAppFormikValues = {
    totp: "",
}

// Core hook — creates the Formik instance for the TOTP form
export const useEnableAuthenticatorAppFormikCore = () => {
    const enableAuthenticatorAppV2SwrMutation = useEnableAuthenticatorAppV2SwrMutation()
    const userSwr = useQueryUserV2Swr()
    const { getAccessToken, authenticated } = usePrivy()
    const dispatch = useAppDispatch()
    return useFormik<EnableAuthenticatorAppFormikValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (!authenticated) {
                throw new Error("User is not authenticated")
            }
            const token = await getAccessToken()
            if (!token) {
                throw new Error("Token is required")
            }
            const success = await runGraphQLWithToast(
                async () => {
                    const response = await enableAuthenticatorAppV2SwrMutation.trigger({
                        request: {
                            totpCode: values.totp,
                        },
                    })
                    if (!response.data?.enableAuthenticatorAppV2) {
                        throw new Error("Failed to verify TOTP")
                    }
                    return response.data.enableAuthenticatorAppV2
                },
                {
                    showSuccessToast: true,
                    showErrorToast: false,
                }
            )
            if (success) {
                await userSwr.mutate()
                dispatch(setManageMFASettingsPage(ManageMFASettingsPage.Base))
                resetForm()
            }
        },
    })
}
