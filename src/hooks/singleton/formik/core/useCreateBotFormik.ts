import { useFormik } from "formik"
import { useEffect } from "react"
import * as Yup from "yup"
import { ChainId } from "@/modules/types"
import { useCreateBotV2SwrMutation } from "../../swr"
import { runGraphQLWithToast } from "@/components/toasts"
import { useRouter } from "next/navigation"
import { paths } from "@/modules/path"
import { setLiquidityPoolIds, setQuoteTokenId, setTargetTokenId, useAppDispatch } from "@/redux"

export interface CreateBotFormikValues {
    name: string
    chainId: ChainId
    isTargetTokenSelected: boolean
    targetTokenId?: string
    quoteTokenId?: string
    liquidityPoolIds: Array<string>
    isExitToUsdc: boolean
    isTermsOfServiceAccepted: boolean
}

const initialValues: CreateBotFormikValues = {
    name: "",
    chainId: ChainId.Solana,
    isTargetTokenSelected: false,
    liquidityPoolIds: [],
    isExitToUsdc: false,
    isTermsOfServiceAccepted: false,
}

const validationSchema = Yup.object({
    name: Yup.string().required("Bot name is required"),
    chainId: Yup.string().required("Chain ID is required"),
    targetTokenId: Yup.string().required("Target token ID is required"),
    quoteTokenId: Yup.string().required("Quote token ID is required"),
    liquidityPoolIds: Yup.array().of(Yup.string()).required("Liquidity pool IDs are required"),
    isExitToUsdc: Yup.boolean().required("Exit to USDC is required"),
    isTermsOfServiceAccepted: Yup.boolean().required("Terms of service acceptance is required").oneOf([true], "Terms of service acceptance is required"),
})

export const useCreateBotFormikCore = () => {
    const createBotV2Mutation = useCreateBotV2SwrMutation()
    const router = useRouter()
    const formik = useFormik<CreateBotFormikValues>({
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

    // update the target token, quote token and liquidity pool ids in the redux store
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(setTargetTokenId(formik.values.targetTokenId))
    }, [formik.values.targetTokenId])

    useEffect(() => {
        dispatch(setQuoteTokenId(formik.values.quoteTokenId))
    }, [formik.values.quoteTokenId])

    useEffect(() => {
        dispatch(setLiquidityPoolIds(formik.values.liquidityPoolIds))
    }, [formik.values.liquidityPoolIds])
    return formik
}
