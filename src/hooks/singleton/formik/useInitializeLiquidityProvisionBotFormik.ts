import { LiquidityPoolId, TokenId } from "@/modules/types"
import { useFormik } from "formik"
import { useContext } from "react"
import * as Yup from "yup"
import { FormikContext } from "./FormikContext"

export interface InitializeLiquidityProvisionBotFormikValues {
    priorityTokenId?: TokenId
    liquidityPools: Array<LiquidityPoolId>
}

const initialValues: InitializeLiquidityProvisionBotFormikValues = {
    liquidityPools: [],
}

const validationSchema = Yup.object({
    priorityTokenId: Yup.string().nullable(),
    liquidityPools: Yup.array().of(Yup.string()).required(),
})

export const useInitializeLiquidityProvisionBotFormikCore = () => {
    return useFormik<InitializeLiquidityProvisionBotFormikValues>({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log(values)
        },
    })
}

export const useInitializeLiquidityProvisionBotFormik = () => {
    const { initializeLiquidityProvisionBotFormik } = useContext(FormikContext)!
    return initializeLiquidityProvisionBotFormik
}