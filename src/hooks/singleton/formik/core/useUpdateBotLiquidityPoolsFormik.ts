import { useFormik } from "formik"
import * as Yup from "yup"
import { runGraphQLWithToast } from "@/modules/toast"
import { useUpdateBotLiquidityPoolsV2SwrMutation } from "../../swr"
import { useQueryBotV2Swr } from "../../swr"
import { useAppSelector } from "@/redux"

export interface UpdateBotLiquidityPoolsFormikValues {
    liquidityPoolIds: Array<string>
}

const initialValues: UpdateBotLiquidityPoolsFormikValues = {
    liquidityPoolIds: [],
}

const validationSchema = Yup.object({
    liquidityPoolIds: Yup.array().of(Yup.string()).required("Liquidity pool IDs are required"),
})

export const useUpdateBotLiquidityPoolsFormikCore = () => {
    const botId = useAppSelector((state) => state.bot.bot?.id)
    const bot = useAppSelector((state) => state.bot.bot)
    const updateBotLiquidityPoolsV2Mutation = useUpdateBotLiquidityPoolsV2SwrMutation()
    const queryBotV2Swr = useQueryBotV2Swr()
    const formik = useFormik<UpdateBotLiquidityPoolsFormikValues>({
        initialValues: {
            ...initialValues,
            liquidityPoolIds: bot?.liquidityPools ?? [],
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            if (!values.liquidityPoolIds.length) {
                throw new Error("Liquidity pool IDs are required")
            }
            const success = await runGraphQLWithToast(
                async () => {
                    if (!botId) {
                        throw new Error("Bot ID is required")
                    }
                    const response = await updateBotLiquidityPoolsV2Mutation.trigger({
                        request: {
                            id: botId,
                            liquidityPoolIds: values.liquidityPoolIds,
                        },
                    })
                    if (!response.data?.updateBotLiquidityPoolsV2) {
                        throw new Error("Failed to update bot liquidity pools")
                    }
                    return response.data?.updateBotLiquidityPoolsV2
                }, 
                {
                    showSuccessToast: true,
                    showErrorToast: true,
                })
            if (success) {
                await queryBotV2Swr.mutate()
                resetForm()
            }
        },
    })
    return formik
}
