import { useFormik } from "formik"
import { useContext } from "react"
import * as Yup from "yup"
import { FormikContext } from "./FormikContext"
import { useUpdateLiquidityProvisionBotRpcsSwrMutation } from "../swr"
import { runGraphQLWithToast } from "@/components"

export interface UpdateRpcsFormikValues {
    rpcUrls: Array<string>
    id: string
}

const initialValues: UpdateRpcsFormikValues = {
    rpcUrls: [],
    id: "",
}

const validationSchema = Yup.object({
    rpcUrls: Yup.array().of(Yup.string()).required(),
    id: Yup.string().required(),
})

export const useUpdateRpcsFormikCore = () => {
    const updateLiquidityProvisionBotRpcsMutation = useUpdateLiquidityProvisionBotRpcsSwrMutation()
   
    return useFormik<UpdateRpcsFormikValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            if (!values.rpcUrls) {
                throw new Error("RPC URLs are required")
            }
            await runGraphQLWithToast(async () => {
                const response = await updateLiquidityProvisionBotRpcsMutation.trigger({
                    id: values.id,
                    rpcUrls: values.rpcUrls,
                })
                if (!response.data?.updateLiquidityProvisionBotRpcs) {
                    throw new Error("Failed to update liquidity provision bot RPCs")
                }
                return response.data.updateLiquidityProvisionBotRpcs
            })
        },
    })
}

export const useUpdateRpcsFormik = () => {
    const { updateRpcsFormik } = useContext(FormikContext)!
    return updateRpcsFormik
}