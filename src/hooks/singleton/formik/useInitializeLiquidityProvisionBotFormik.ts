import { LiquidityPoolId, TokenId } from "@/modules/types"
import { useFormik } from "formik"
import { useContext } from "react"
import * as Yup from "yup"
import { FormikContext } from "./FormikContext"
import { useInitializeLiquidityProvisionBotSwrMutation } from "../swr"
import { runGraphQLWithToast } from "@/components/toasts"

export interface InitializeLiquidityProvisionBotFormikValues {
    priorityTokenId?: TokenId
    liquidityPoolIds: Array<LiquidityPoolId>
    name: string
    id: string
}

const initialValues: InitializeLiquidityProvisionBotFormikValues = {
    liquidityPoolIds: [],
    name: "",
    id: "",
}

const validationSchema = Yup.object({
    priorityTokenId: Yup.string().nullable(),
    liquidityPoolIds: Yup.array().of(Yup.string()).required(),
    name: Yup.string().required(),
    id: Yup.string().required(),
})

export const useInitializeLiquidityProvisionBotFormikCore = () => {
    const initializeLiquidityProvisionBotMutation = useInitializeLiquidityProvisionBotSwrMutation()
    return useFormik<InitializeLiquidityProvisionBotFormikValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            if (!values.priorityTokenId || values.liquidityPoolIds.length === 0) {
                throw new Error("Priority token id and liquidity pools are required")
            }
            await runGraphQLWithToast(async () => {
                const response = await initializeLiquidityProvisionBotMutation.trigger({
                    id: values.id,
                    name: values.name,
                    priorityTokenId: values.priorityTokenId!,
                    liquidityPoolIds: values.liquidityPoolIds,
                })
                if (!response.data?.initializeLiquidityProvisionBot) {
                    throw new Error("Failed to initialize liquidity provision bot")
                }
                return response.data.initializeLiquidityProvisionBot
            })
        },
    })
}

export const useInitializeLiquidityProvisionBotFormik = () => {
    const { initializeLiquidityProvisionBotFormik } = useContext(FormikContext)!
    return initializeLiquidityProvisionBotFormik
}