import { useFormik } from "formik"
import * as Yup from "yup"
import { useRequireMFADisclosure, useVerifyDisclosure } from "../../discloresure"
import { isAddress } from "@/modules/blockchain"
import { ChainId } from "@/modules/types"
import { setVerifyModalOnAction, useAppDispatch, useAppSelector } from "@/redux"
import { usePrivy } from "@privy-io/react-auth"

export interface PercentageWithdrawFormikValues {
    withdrawalAddress: string
    percentage: number
    chainId?: ChainId
}

const validationSchema = Yup.object({
    withdrawalAddress: Yup.string()
        .required("Withdrawal address is required")
        .test("is-address", "Invalid withdrawal address", function (value) {
            if (!value) return false
            return isAddress(value, this.parent.chainId)
        }
        ),
    percentage: Yup.number()
        .required("Percentage is required")
        .min(0, "Percentage must be at least 0")
        .max(100, "Percentage must be at most 100"),
})

export const usePercentageWithdrawFormikCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const user = useAppSelector((state) => state.session.user)
    const { onOpen: onOpenRequireMFAModal } = useRequireMFADisclosure()
    const { onOpen: onOpenVerifyModal } = useVerifyDisclosure()
    const dispatch = useAppDispatch()
    const bot = useAppSelector((state) => state.bot.bot)
    return useFormik<PercentageWithdrawFormikValues>({
        initialValues: {
            withdrawalAddress: "",
            percentage: 0,
            chainId: bot?.chainId,
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
            if (!user.mfaEnabled) {
                onOpenRequireMFAModal()
                return
            }
            const token = await getAccessToken()
            if (!token) {
                throw new Error("Token is required")
            }
            dispatch(
                setVerifyModalOnAction(() => {
                    return true
                })
            )
            onOpenVerifyModal()
        },
    })
}
