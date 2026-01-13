import { useFormik } from "formik"
import * as Yup from "yup"
import { useEnableMFASwrMutation } from "../../swr"
import { runGraphQLWithToast } from "@/components"
import { GraphQLHeadersKey } from "@/modules/api"
import { useEnableMFADisclosure } from "../../discloresure"
import { 
    EnableMFAPage, 
    setEnableMFAPage, 
    useAppDispatch 
} from "@/redux"

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
    const enableMFASwrMutation = useEnableMFASwrMutation()
    const { onClose } = useEnableMFADisclosure()
    const dispatch = useAppDispatch()
    return useFormik<EnableMFAFormikValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const success = await runGraphQLWithToast(
                async () => {
                    const response = await enableMFASwrMutation.trigger({
                        headers: {
                            [GraphQLHeadersKey.TOTP]: values.totp,
                        },
                    })
                    if (!response.data?.enableMFA) {
                        throw new Error("Failed to verify TOTP")
                    }
                    return response.data.enableMFA
                }, {
                    showSuccessToast: true,
                    showErrorToast: false,
                })
            if (success) {
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
