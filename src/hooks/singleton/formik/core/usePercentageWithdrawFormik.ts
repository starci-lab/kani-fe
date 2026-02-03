import { useFormik } from "formik"
import * as Yup from "yup"
import { useWithdrawDisclosure } from "../../discloresure"

export interface PercentageWithdrawFormikValues {
    withdrawalAddress: string
    percentage: number
}

const validationSchema = Yup.object({
    withdrawalAddress: Yup.string().required("Withdrawal address is required"),
    percentage: Yup.number()
        .required("Percentage is required")
        .min(0, "Percentage must be at least 0")
        .max(100, "Percentage must be at most 100"),
})

export const usePercentageWithdrawFormikCore = () => {
    const { onClose } = useWithdrawDisclosure()
    return useFormik<PercentageWithdrawFormikValues>({
        initialValues: {
            withdrawalAddress: "",
            percentage: 0,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            // TODO: call withdraw API with withdrawalAddress + values.percentage
            onClose()
            resetForm()
        },
    })
}
