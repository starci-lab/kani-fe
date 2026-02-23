import { useFormik } from "formik"
import * as Yup from "yup"
import { 
    useRequireMFADisclosure, 
    useMFAVerificationDisclosure
} from "../../discloresure"
import { ChainId } from "@/modules/types"
import { 
    setMFAVerificationModalIsActionPending, 
    setMFAVerificationModalOnAction, 
    useAppDispatch, 
    useAppSelector 
} from "@/redux"
import { usePrivy } from "@privy-io/react-auth"
import { useQueryBalancesV2Swr, useWithdrawV2SwrMutation } from "../../swr"
import { runGraphQLWithToast } from "@/components"
import { GraphQLHeadersKey } from "@/modules/api"
import { bnMulDecimal } from "@/modules/utils"
import Decimal from "decimal.js"
import BN from "bn.js"

export interface PercentageWithdrawFormikValues {
    percentage: number
    chainId?: ChainId
    toUsdc: boolean
}

const validationSchema = Yup.object({
    percentage: Yup.number()
        .required("Percentage is required")
        .min(0, "Percentage must be at least 0")
        .max(100, "Percentage must be at most 100"),
})

export const usePercentageWithdrawFormikCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const swr = useQueryBalancesV2Swr()
    const withdrawV2Mutation = useWithdrawV2SwrMutation()
    const user = useAppSelector((state) => state.session.user)
    const { onOpen: onOpenRequireMFAModal } = useRequireMFADisclosure()
    const { onOpen: onOpenMFAVerificationModal } = useMFAVerificationDisclosure()
    const dispatch = useAppDispatch()
    const bot = useAppSelector((state) => state.bot.bot)
    const balances = swr.data?.data?.balancesV2.data
    const formik = useFormik<PercentageWithdrawFormikValues>({
        initialValues: {
            percentage: 0,
            chainId: bot?.chainId,
            toUsdc: false,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async () => {
            if (!authenticated) {
                throw new Error("User is not authenticated")
            }
            if (!user) {
                throw new Error("User is not authenticated")
            }
            if (!user.authenticationFactors?.length) {
                onOpenRequireMFAModal()
                return
            }
            const token = await getAccessToken()
            if (!token) {
                throw new Error("Token is required")
            }
            dispatch(
                setMFAVerificationModalOnAction(
                    async ({ totp }) => {
                        const botId = bot?.id
                        if (!botId) {
                            throw new Error("Bot ID is required")
                        }
                        const percentage = formik.values.percentage
                        if (!percentage) {
                            throw new Error("Percentage is required")
                        }
                        const success = await runGraphQLWithToast(
                            async () => {
                                const result = await withdrawV2Mutation.trigger({
                                    request: {
                                        id: botId ?? "",
                                        tokenInputs:
                                        balances?.map((balance) => ({
                                            id: balance.id,
                                            amount: bnMulDecimal({
                                                bn: new BN(balance.balanceAmount),
                                                decimal: new Decimal(percentage).div(new Decimal(100)),
                                            }).toString()
                                        })) ?? [],
                                        toUsdc: formik.values.toUsdc,
                                    },
                                    headers: totp
                                        ? { 
                                            [
                                            GraphQLHeadersKey.TOTP
                                            ]: totp 
                                        }
                                        : undefined,
                                })
                                const response = result?.data?.withdrawV2
                                if (!response) {
                                    throw new Error("Withdrawal failed")
                                }
                                return response
                            },
                            { 
                                showSuccessToast: false, 
                                showErrorToast: true 
                            }
                        )
                        if (success) {
                            await swr.mutate()
                            formik.resetForm()
                        }
                        return success
                    }
                )    
            )
            dispatch(setMFAVerificationModalIsActionPending(true))
            onOpenMFAVerificationModal()
        },
    })
    return formik
}
