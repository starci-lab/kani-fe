import { useFormik } from "formik"
import * as Yup from "yup"
import { useEnableMFAV2SwrMutation, useQueryUserV2Swr } from "../../swr"
import { runGraphQLWithToast } from "@/components"
import { useEnableMFADisclosure } from "../../discloresure"
import { 
    EnableMFAPage, 
    setEnableMFAPage, 
    useAppDispatch 
} from "@/redux"
import { usePrivy } from "@privy-io/react-auth"

// Form values type — only one field for the 6-digit OTP code
export interface EnableMFAFormikValues {
    totp: string
}

// Validation schema for the OTP form
const validationSchema = Yup.object({
    totp: Yup.string()
        .length(6, "OTP must be exactly 6 digits")
        .matches(/^\d+$/, "OTP must contain only digits")
        .required("OTP is required"),
})

const initialValues: EnableMFAFormikValues = {
    totp: "",
}

// Core hook — creates the Formik instance for the TOTP form
export const useEnableMFAFormikCore = () => {
    const enableMFAV2SwrMutation = useEnableMFAV2SwrMutation()
    const userSwr = useQueryUserV2Swr()
    const { getAccessToken, authenticated } = usePrivy()
    const { onClose } = useEnableMFADisclosure()
    const dispatch = useAppDispatch()
    return useFormik<EnableMFAFormikValues>({
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
                    const response = await enableMFAV2SwrMutation.trigger({
                        token,
                        request: {
                            totpCode: values.totp,
                        },
                    })
                    if (!response.data?.enableMFAV2) {
                        throw new Error("Failed to verify TOTP")
                    }
                    return response.data.enableMFAV2
                }, {
                    showSuccessToast: true,
                    showErrorToast: false,
                })
            if (success) {
                await userSwr.mutate()
                // set the page to the scan QR page
                dispatch(setEnableMFAPage(EnableMFAPage.ScanQR))
                // close the modal
                onClose()
                // reset the form
                resetForm()
            }
        },
    })
}
