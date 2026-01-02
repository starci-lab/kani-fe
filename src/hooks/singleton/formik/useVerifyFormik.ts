import { useFormik } from "formik"
import { use } from "react"
import * as Yup from "yup"
import { FormikContext } from "./FormikContext"
import { useVerifyDisclosure } from "../discloresure"
import { useAppDispatch, useAppSelector } from "@/redux"
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
    const { onClose: onCloseVerifyModal} = useVerifyDisclosure()
    const onAction = useAppSelector((state) => state.modals.verify.onAction)
    return useFormik<VerifyFormikValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (!values.emailCode) {
                throw new Error("Email is required")
            }
            const success = onAction({
                emailOtp: values.emailCode,
                totp: values.authenticatorAppCode,
            })
            if (success) {
                onCloseVerifyModal()
                dispatch(setVerifyModalPage(VerifyPage.Base))
                resetForm()
            }
        },
    })
}

export const useVerifyFormik = () => {
    const { verifyFormik } = use(FormikContext)!
    return verifyFormik
}