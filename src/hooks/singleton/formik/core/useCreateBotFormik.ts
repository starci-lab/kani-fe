import { useFormik } from "formik"
import { useEffect } from "react"
import * as Yup from "yup"
import { BotViolateIndicatorType, ChainId, IndicatorName, LogicalOperator, Operation, RangeTier } from "@/modules/types"
import { BotViolateIndicatorSchema } from "@/modules/types"
import { useCreateBotV2SwrMutation } from "../../swr"
import { runGraphQLWithToast } from "@/modules/toast"
import { useRouter } from "next/navigation"
import { paths } from "@/resources/path"
import { setLiquidityPoolIds, setQuoteTokenId, setTargetTokenId, useAppDispatch } from "@/redux"
import { isAddress } from "@/modules/blockchain"
import { DeepPartial } from "@apollo/client/utilities"

export interface CreateBotFormikValues {
    name: string
    chainId: ChainId
    isTargetTokenSelected: boolean
    targetTokenId?: string
    quoteTokenId?: string
    liquidityPoolIds: Array<string>
    rangeTier: RangeTier
    violateIndicators: Array<DeepPartial<BotViolateIndicatorSchema>>
    isExitToUsdc: boolean
    withdrawalAddress?: string
    isTermsOfServiceAccepted: boolean
}

const initialValues: CreateBotFormikValues = {
    name: "",
    chainId: ChainId.Solana,
    isTargetTokenSelected: false,
    liquidityPoolIds: [],
    rangeTier: RangeTier.Mid,
    violateIndicators: [{
        name: "PCT 30s - Violate 1%",
        type: BotViolateIndicatorType.PricePct,
        triggerThresholds: {
            indicators: [
                {
                    name: IndicatorName.Pct, op: Operation.Gte, value: 0.01
                },
            ],
            operation: LogicalOperator.And,
        },
        reentryThresholds: {
            indicators: [
                {
                    name: IndicatorName.Pct, op: Operation.Lt, value: 0.005
                },
            ],
            operation: LogicalOperator.And,
        },
        timeWindowMs: 30000,
    },
    {
        name: "PCT 10s - Violate 0.5%",
        type: BotViolateIndicatorType.PricePct,
        triggerThresholds: {
            indicators: [
                {
                    name: IndicatorName.Pct, op: Operation.Gte, value: 0.005
                },
            ],
            operation: LogicalOperator.And,
        },
        reentryThresholds: {
            indicators: [
                {
                    name: IndicatorName.Pct, op: Operation.Lt, value: 0.0025
                },
            ],
            operation: LogicalOperator.And,
        },
        timeWindowMs: 10000,
    },
    {
        name: "Price Regression 10s - Violate 0.3% & R2 0.64",
        type: BotViolateIndicatorType.PriceRegression,
        triggerThresholds: {
            indicators: [
                {
                    name: IndicatorName.Pct, 
                    op: Operation.Gte, 
                    value: 0.003,
                },
                {
                    name: IndicatorName.R2, 
                    op: Operation.Gte, 
                    value: 0.64,
                },
            ],
            operation: LogicalOperator.And,
        },
        reentryThresholds: {
            indicators: [
                {
                    name: IndicatorName.Pct, 
                    op: Operation.Lt, 
                    value: 0.0015,
                },
                {
                    name: IndicatorName.R2, 
                    op: Operation.Lt, 
                    value: 0.64,
                },
            ],
            operation: LogicalOperator.Or,
        },
        timeWindowMs: 10000,
    },
    {
        name: "Price Regression 30s - Violate 0.6% & R2 0.64",
        type: BotViolateIndicatorType.PriceRegression,
        triggerThresholds: {
            indicators: [
                {
                    name: IndicatorName.Pct, 
                    op: Operation.Gte, 
                    value: 0.006,
                },
                {
                    name: IndicatorName.R2, 
                    op: Operation.Gte, 
                    value: 0.64,
                },
            ],
            operation: LogicalOperator.And,
        },
        reentryThresholds: {
            indicators: [
                {
                    name: IndicatorName.Pct, 
                    op: Operation.Lt, 
                    value: 0.003
                },
                {
                    name: IndicatorName.R2, 
                    op: Operation.Lt, 
                    value: 0.64
                },
            ],
            operation: LogicalOperator.Or,
        },
        timeWindowMs: 30000,
    },],
    isExitToUsdc: true,
    isTermsOfServiceAccepted: false,
}

const validationSchema = Yup.object(
    {
        name: Yup.string().required("Bot name is required"),
        chainId: Yup.string().required("Chain ID is required"),
        targetTokenId: Yup.string().required("Target token ID is required"),
        quoteTokenId: Yup.string().required("Quote token ID is required"),
        liquidityPoolIds: Yup.array().of(Yup.string()).required("Liquidity pool IDs are required"),
        rangeTier: Yup.string().required("Strategy / range tier is required").oneOf(Object.values(RangeTier)),
        violateIndicators: Yup.array().required(),
        isExitToUsdc: Yup.boolean().required("Exit to USDC is required"),
        isTermsOfServiceAccepted: Yup.boolean().required("Terms of service acceptance is required").oneOf([true], "Terms of service acceptance is required"),
        withdrawalAddress: Yup.string()
            .test("is-address", "Invalid withdrawal address", function (value) {
                if (!value) return true
                return isAddress(value, this.parent.chainId)
            }
            ),
    }
)

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
                            rangeTier: values.rangeTier,
                            violateIndicators: values.violateIndicators,
                            isExitToUsdc: values.isExitToUsdc,
                            withdrawalAddress: values.withdrawalAddress,
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
