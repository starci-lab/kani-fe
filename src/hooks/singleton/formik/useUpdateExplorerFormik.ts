import { ExplorerId } from "@/modules/blockchain"
import { useFormik } from "formik"
import { useContext } from "react"
import * as Yup from "yup"
import { FormikContext } from "./FormikContext"
import { useUpdateLiquidityProvisionBotExplorerIdSwrMutation } from "../swr"
import { runGraphQLWithToast } from "@/components/toasts"

export interface UpdateExplorerFormikValues {
    explorerId: ExplorerId
    id: string
}

const initialValues: UpdateExplorerFormikValues = {
    explorerId: ExplorerId.SuiVision,
    id: "",
}

const validationSchema = Yup.object({
    explorerId: Yup.string().required(),
    id: Yup.string().required(),
})

export const useUpdateExplorerFormikCore = () => {
    const updateLiquidityProvisionBotExplorerIdMutation = useUpdateLiquidityProvisionBotExplorerIdSwrMutation()
   
    return useFormik<UpdateExplorerFormikValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            if (!values.explorerId) {
                throw new Error("Explorer id is required")
            }
            await runGraphQLWithToast(async () => {
                const response = await updateLiquidityProvisionBotExplorerIdMutation.trigger({
                    id: values.id,
                    explorerId: values.explorerId,
                })
                if (!response.data?.updateLiquidityProvisionBotExplorerId) {
                    throw new Error("Failed to update liquidity provision bot explorer id")
                }
                return response.data.updateLiquidityProvisionBotExplorerId
            })
        },
    })
}

export const useUpdateExplorerFormik = () => {
    const { updateExplorerFormik } = useContext(FormikContext)!
    return updateExplorerFormik
}