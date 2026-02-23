import { useFormik } from "formik"
import * as Yup from "yup"
import { 
    setMFAVerificationModalPage, 
    MFAVerificationPage,
    useAppDispatch, 
    useAppSelector, 
    setWithdrawalExecuting 
} from "@/redux"
import { useMFAVerificationDisclosure } from "../../discloresure"

export interface VerifyAuthenticatorAppFormikValues {
    authenticatorAppCode: string
    authenticatorAppCodeInput: string
}

const initialValues: VerifyAuthenticatorAppFormikValues = {
    authenticatorAppCode: "",
    authenticatorAppCodeInput: "",
}

const validationSchema = Yup.object({
    authenticatorAppCodeInput: Yup.string()
        .length(6, "Code must be exactly 6 digits")
        .matches(/^\d+$/, "Code must contain only digits")
        .required("Authenticator app code is required"),
})

export const useVerifyAuthenticatorAppFormikCore = () => {
    const dispatch = useAppDispatch()
    const onAction = useAppSelector((state) => state.modals.mfaVerification.onAction)
    const { onClose: onCloseMFAVerificationModal } = useMFAVerificationDisclosure()
    return useFormik<VerifyAuthenticatorAppFormikValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const totp = values.authenticatorAppCode || values.authenticatorAppCodeInput
            const success = await Promise.resolve(onAction?.({ totp }))
            if (success) {
                onCloseMFAVerificationModal()
                dispatch(setMFAVerificationModalPage(MFAVerificationPage.Base))
                resetForm()
                dispatch(setWithdrawalExecuting(true))
            }
        },
    })
}
