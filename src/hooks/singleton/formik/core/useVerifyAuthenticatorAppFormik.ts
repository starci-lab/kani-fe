import { useFormik } from "formik"
import * as Yup from "yup"
import { useMFAVerificationDisclosure } from "../../discloresure"
import { setMFAVerificationModalPage, MFAVerificationPage, useAppDispatch, useAppSelector } from "@/redux"

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
    const { onClose: onCloseMFAVerificationModal } = useMFAVerificationDisclosure()
    const onAction = useAppSelector((state) => state.modals.mfaVerification.onAction)

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
            }
        },
    })
}
