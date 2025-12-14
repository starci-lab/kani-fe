import { useFormik } from "formik"
import { useContext } from "react"
import * as Yup from "yup"
import { FormikContext } from "./FormikContext"
import { ChainId, LiquidityPoolId, TokenId } from "@/modules/types"
import { useCreateBotSwrMutation } from "../swr"
import { runGraphQLWithToast } from "@/components/toasts"

export interface CreateBotFormikValues {
    name: string
    chainId: ChainId
    isTargetTokenSelected: boolean
    targetTokenId?: TokenId
    quoteTokenId?: TokenId
    liquidityPoolIds: Array<LiquidityPoolId>
    isExitToUsdc: boolean
}

const initialValues: CreateBotFormikValues = {
    name: "",
    chainId: ChainId.Solana,
    isTargetTokenSelected: false,
    liquidityPoolIds: [],
    isExitToUsdc: false,
}

const validationSchema = Yup.object({
    name: Yup.string().required("Bot name is required"),
    chainId: Yup.string().required("Chain ID is required"),
    targetTokenId: Yup.string().required("Target token ID is required"),
    quoteTokenId: Yup.string().required("Quote token ID is required"),
    liquidityPoolIds: Yup.array().of(Yup.string()).required("Liquidity pool IDs are required"),
    isExitToUsdc: Yup.boolean().required("Exit to USDC is required"),
})

export const useCreateBotFormikCore = () => {
    const createBotMutation = useCreateBotSwrMutation()
    return useFormik<CreateBotFormikValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            if (!values.targetTokenId || !values.quoteTokenId) {
                throw new Error("Target token ID and quote token ID are required")
            }
            await runGraphQLWithToast(
                async () => {
                    const response = await createBotMutation.trigger({
                        request: {
                            name: values.name,
                            chainId: values.chainId,
                            liquidityPoolIds: values.liquidityPoolIds,
                            targetTokenId: values.targetTokenId!,
                            quoteTokenId: values.quoteTokenId!,
                            isExitToUsdc: values.isExitToUsdc,
                        },
                    })
                    if (!response.data?.createBot) {
                        throw new Error("Failed to create bot")
                    }
                    return response.data?.createBot
                },
                {
                    showSuccessToast: true,
                    showErrorToast: true,
                }
            )
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