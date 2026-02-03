import { useFormik } from "formik"
import * as Yup from "yup"
import { useRequireMFADisclosure, useVerifyDisclosure } from "../../discloresure"
import { useQueryBalancesV2Swr } from "../../swr"
import { useEffect } from "react"
import { setVerifyModalOnAction, useAppDispatch, useAppSelector } from "@/redux"
import Decimal from "decimal.js"
import { toDecimalAmount } from "@/modules/utils"
import BN from "bn.js"
import { isAddress } from "@/modules/blockchain"
import { ChainId } from "@/modules/types"
import { usePrivy } from "@privy-io/react-auth"

export interface SingleAssetWithdrawFormikValues {
    withdrawalAddress: string
    tokenId?: string
    chainId?: ChainId
    amount?: string
    balance?: Decimal
    showBalance: boolean
}

const validationSchema = Yup.object({
    withdrawalAddress: Yup.string()
        .required("Withdrawal address is required")
        .test("is-address", "Invalid withdrawal address", function (value) {
            if (!value) return false
            return isAddress(value, this.parent.chainId)
        }
        ),
    tokenId: Yup.string().required("Token is required"),
    balance: Yup.number().required(),
    amount: Yup.string()
        .required("Amount is required")
        .test("positive", "Amount must be greater than 0", (value) => {
            if (!value) return false
            const num = Number(value)
            return !Number.isNaN(num) && num > 0
        })
        .test("max", "Amount must be less than or equal to balance", function (value) {
            if (!value) return false
            const num = Number(value)
            const { balance } = this.parent
            return !Number.isNaN(num) && num <= Number(balance ?? 0)
        }),
})

export const useSingleAssetWithdrawFormikCore = () => {
    const swr = useQueryBalancesV2Swr()
    const { getAccessToken, authenticated } = usePrivy()
    const { onOpen: onOpenRequireMFAModal } = useRequireMFADisclosure()
    const { onOpen: onOpenVerifyModal } = useVerifyDisclosure()
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.session.user)
    const bot = useAppSelector((state) => state.bot.bot)
    const formik = useFormik<SingleAssetWithdrawFormikValues>({
        initialValues: {
            withdrawalAddress: "",
            tokenId: swr.data?.data?.balancesV2.data?.[0]?.id,
            showBalance: true,
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
    const tokens = useAppSelector((state) => state.static.tokens)
    useEffect(() => {
        if (!formik.values.tokenId) return
        if (!formik.values.chainId) return
        const balanceRaw = swr.data?.data?.balancesV2.data?.find((balance) => balance.id === formik.values.tokenId)?.balanceAmount
        if (!balanceRaw) return
        const token = tokens.find((token) => token.id === formik.values.tokenId)
        if (!token) return
        const balance = toDecimalAmount({
            amount: new BN(balanceRaw),
            decimals: new Decimal(token.decimals),
        })
        formik.setFieldValue("balance", balance)
    }, [formik.values.tokenId])
    return formik
}
