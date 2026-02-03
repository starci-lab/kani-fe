import { useFormik } from "formik"
import * as Yup from "yup"
import { useRequireMFADisclosure, useMFAVerificationDisclosure } from "../../discloresure"
import { ChainId } from "@/modules/types"
import { setMFAVerificationModalOnAction, useAppDispatch, useAppSelector } from "@/redux"
import { usePrivy } from "@privy-io/react-auth"

export interface PercentageWithdrawFormikValues {
    percentage: number
    chainId?: ChainId
}

const validationSchema = Yup.object({
    percentage: Yup.number()
        .required("Percentage is required")
        .min(0, "Percentage must be at least 0")
        .max(100, "Percentage must be at most 100"),
})

export const usePercentageWithdrawFormikCore = () => {
    const { getAccessToken, authenticated } = usePrivy()
    const user = useAppSelector((state) => state.session.user)
    const { onOpen: onOpenRequireMFAModal } = useRequireMFADisclosure()
    const { onOpen: onOpenMFAVerificationModal } = useMFAVerificationDisclosure()
    const dispatch = useAppDispatch()
    const bot = useAppSelector((state) => state.bot.bot)
    return useFormik<PercentageWithdrawFormikValues>({
        initialValues: {
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
            if (!user.authenticationFactors?.length) {
                onOpenRequireMFAModal()
                return
            }
            const token = await getAccessToken()
            if (!token) {
                throw new Error("Token is required")
            }
            dispatch(
                setMFAVerificationModalOnAction(() => {
                    alert("onAction")
                    return true
                })
            )
            onOpenMFAVerificationModal()
        },
    })
}
