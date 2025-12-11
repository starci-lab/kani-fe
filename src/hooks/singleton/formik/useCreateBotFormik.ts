import { useFormik } from "formik"
import { useContext } from "react"
import * as Yup from "yup"
import { FormikContext } from "./FormikContext"
import { ChainId } from "@/modules/types"

export interface CreateBotFormikValues {
    name: string
    chainId: ChainId
}

const initialValues: CreateBotFormikValues = {
    name: "",
    chainId: ChainId.Solana,
}

export const useCreateBotFormikCore = () => {
    const validationSchema = Yup.object({
        name: Yup.string().required("Bot name is required"),
    })
    return useFormik<CreateBotFormikValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log(values)
        }
    })
}

export const useCreateBotFormik = () => {
    const formik = useContext(FormikContext)
    if (!formik) {
        throw new Error("Formik context not found")
    }
    return formik.createBotFormik
}