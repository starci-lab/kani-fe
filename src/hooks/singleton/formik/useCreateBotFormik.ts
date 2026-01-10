import { useFormik } from "formik"
import { use } from "react"
import * as Yup from "yup"
import { FormikContext } from "./FormikContext"
import { ChainId, LiquidityPoolId, TokenId } from "@/modules/types"
import { useCreateBotV2SwrMutation } from "../swr"
import { runGraphQLWithToast } from "@/components/toasts"
import { useRouter } from "next/navigation"
import { paths } from "@/modules/path"

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
    const createBotV2Mutation = useCreateBotV2SwrMutation()
    const router = useRouter()
    return useFormik<CreateBotFormikValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (!values.targetTokenId || !values.quoteTokenId) {
                throw new Error("Target token ID and quote token ID are required")
            }
            let botId = ""
            const success = await runGraphQLWithToast(
                async () => {
                    const response = await createBotV2Mutation.trigger({
                        request: {
                            name: values.name,
                            chainId: values.chainId,
                            liquidityPoolIds: values.liquidityPoolIds,
                            targetTokenId: values.targetTokenId!,
                            quoteTokenId: values.quoteTokenId!,
                            isExitToUsdc: values.isExitToUsdc,
                        },
                    })
                    if (!response.data?.createBotV2) {
                        throw new Error("Failed to create bot")
                    }
                    botId = response.data?.createBotV2.data?.id ?? ""
                    return response.data?.createBotV2
                },
                {
                    showSuccessToast: true,
                    showErrorToast: true,
                }
            )
            if (success) {
                resetForm()
                router.push(paths().bots().bot(botId))
            }
        }
    })
}   

export const useCreateBotFormik = () => {
    const { createBotFormik } = use(FormikContext)!
    return createBotFormik
}