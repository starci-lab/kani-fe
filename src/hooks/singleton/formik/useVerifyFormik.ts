import { useFormik } from "formik"
import { useContext } from "react"
import * as Yup from "yup"
import { FormikContext } from "./FormikContext"
import { runGraphQLWithToast } from "@/components/toasts"
import { useBackupBotPrivateKeySwrMutation } from "../swr"
import { 
    useExportPrivateKeyModalDisclosure, 
    useVerifyDisclosure 
} from "../discloresure"
import { useAppDispatch, setExportPrivateKey } from "@/redux"
import { setVerifyModalPage, VerifyPage } from "@/redux"

export interface VerifyFormikValues {
    emailCode: string
    authenticatorAppCode: string
    emailCodeInput: string
    authenticatorAppCodeInput: string
}

const initialValues: VerifyFormikValues = {
    emailCode: "",
    authenticatorAppCode: "",
    emailCodeInput: "",
    authenticatorAppCodeInput: "",
}

const validationSchema = Yup.object({
    emailCodeInput: Yup.string().required("Email code input is required"),
    authenticatorAppCodeInput: Yup.string().required("Authenticator app code input is required"),
})

export const useVerifyFormikCore = () => {
    const dispatch = useAppDispatch()
    const backupBotPrivateKeyMutation = useBackupBotPrivateKeySwrMutation()
    const { onOpen: onOpenExportPrivateKey } = useExportPrivateKeyModalDisclosure()
    const { onClose: onCloseVerifyModal} = useVerifyDisclosure()
    return useFormik<VerifyFormikValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (!values.emailCode) {
                throw new Error("Email is required")
            }
            let privateKey = ""
            const success = await runGraphQLWithToast(
                async () => {
                    const response = await backupBotPrivateKeyMutation.trigger({
                        emailOtp: values.emailCode,
                        totp: values.authenticatorAppCode,
                    })
                    if (!response.data?.backupBotPrivateKey) {
                        throw new Error("Failed to verify OTP")
                    }
                    privateKey = response.data.backupBotPrivateKey.data?.privateKey ?? ""
                    return response.data.backupBotPrivateKey
                }, 
                {
                    showSuccessToast: true,
                    showErrorToast: true,
                })
            if (success) {
                onCloseVerifyModal()
                dispatch(setVerifyModalPage(VerifyPage.Base))
                resetForm()
                dispatch(setExportPrivateKey(privateKey))
                onOpenExportPrivateKey()
            }
        },
    })
}

export const useVerifyFormik = () => {
    const { verifyFormik } = useContext(FormikContext)!
    return verifyFormik
}