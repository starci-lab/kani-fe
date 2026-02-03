import { useFormik } from "formik"
import * as Yup from "yup"
import { useWithdrawDisclosure } from "../../discloresure"

export interface SingleAssetWithdrawFormikValues {
    withdrawalAddress: string
    tokenId: string
    amount: string
}

const validationSchema = Yup.object({
    withdrawalAddress: Yup.string().required("Withdrawal address is required"),
    tokenId: Yup.string().required("Token is required"),
    amount: Yup.string()
        .required("Amount is required")
        .test("positive", "Amount must be greater than 0", (value) => {
            if (!value) return false
            const num = Number(value)
            return !Number.isNaN(num) && num > 0
        }),
})

export const useSingleAssetWithdrawFormikCore = () => {
    const { onClose } = useWithdrawDisclosure()
    return useFormik<SingleAssetWithdrawFormikValues>({
        initialValues: {
            withdrawalAddress: "",
            tokenId: "",
            amount: "",
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            // TODO: call withdraw API with withdrawalAddress + values.tokenId + values.amount
            onClose()
            resetForm()
        },
    })
}
