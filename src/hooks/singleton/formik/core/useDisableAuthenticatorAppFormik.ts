import { useFormik } from "formik"
import * as Yup from "yup"
import { useDisableAuthenticatorAppV2SwrMutation, useQueryUserV2Swr } from "../../swr"
import { runGraphQLWithToast } from "@/modules/toast"
import {
    ManageMFASettingsPage,
    setManageMFASettingsPage,
    useAppDispatch,
} from "@/redux"
import { usePrivy } from "@privy-io/react-auth"

export interface DisableAuthenticatorAppFormikValues {
    totp: string
}

const validationSchema = Yup.object({
    totp: Yup.string()
        .length(6, "OTP must be exactly 6 digits")
        .matches(/^\d+$/, "OTP must contain only digits")
        .required("OTP is required"),
})

const initialValues: DisableAuthenticatorAppFormikValues = {
    totp: "",
}

export const useDisableAuthenticatorAppFormikCore = () => {
    const disableAuthenticatorAppV2SwrMutation = useDisableAuthenticatorAppV2SwrMutation()
    const userSwr = useQueryUserV2Swr()
    const { getAccessToken, authenticated } = usePrivy()
    const dispatch = useAppDispatch()
    return useFormik<DisableAuthenticatorAppFormikValues>({
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
                    const response = await disableAuthenticatorAppV2SwrMutation.trigger({
                        request: {
                            totpCode: values.totp,
                        },
                    })
                    if (!response.data?.disableAuthenticatorAppV2) {
                        throw new Error("Failed to verify TOTP")
                    }
                    return response.data.disableAuthenticatorAppV2
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
