import { useFormik } from "formik"
import { useContext } from "react"
import * as Yup from "yup"
import { FormikContext } from "./FormikContext"
import { ChainId, LiquidityPoolId, TokenId } from "@/modules/types"

export interface CreateBotFormikValues {
    name: string
    chainId: ChainId
    isTargetTokenSelected: boolean
    targetTokenId?: TokenId
    quoteTokenId?: TokenId
    liquidityPoolIds: Array<LiquidityPoolId>
}

const initialValues: CreateBotFormikValues = {
    name: "",
    chainId: ChainId.Solana,
    isTargetTokenSelected: false,
    liquidityPoolIds: [],
}

const validationSchema = Yup.object({
    name: Yup.string().required("Bot name is required"),
    chainId: Yup.string().required("Chain ID is required"),
    targetTokenId: Yup.string().required("Target token ID is required"),
    quoteTokenId: Yup.string().required("Quote token ID is required"),
    liquidityPoolIds: Yup.array().of(Yup.string()).required("Liquidity pool IDs are required"),
})

export const useCreateBotFormikCore = () => {
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