import { useFormik } from "formik"
import * as Yup from "yup"
import { runGraphQLWithToast } from "@/modules/toast"
import { useUpdateBotSettingsV2SwrMutation } from "../../swr"
import { useQueryBotV2Swr } from "../../swr"
import { useAppSelector } from "@/redux"

export interface UpdateBotWithdrawalAddressFormikValues {
    withdrawalAddress?: string
}

const initialValues: UpdateBotWithdrawalAddressFormikValues = {}

const validationSchema = Yup.object({
    withdrawalAddress: Yup.string().nullable().optional(),
})

export const useUpdateBotWithdrawalAddressFormikCore = () => {
    const botId = useAppSelector((state) => state.bot.bot?.id)
    const bot = useAppSelector((state) => state.bot.bot)
    const updateBotSettingsV2Mutation = useUpdateBotSettingsV2SwrMutation()
    const queryBotV2Swr = useQueryBotV2Swr()

    return useFormik<UpdateBotWithdrawalAddressFormikValues>({
        initialValues: {
            ...initialValues,
            withdrawalAddress: bot?.withdrawalAddress ?? "",
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            const success = await runGraphQLWithToast(
                async () => {
                    if (!botId) {
                        throw new Error("Bot ID is required")
                    }
                    const response = await updateBotSettingsV2Mutation.trigger({
                        request: {
                            id: botId,
                            withdrawalAddress: values.withdrawalAddress ?? "",
                        },
                    })
                    if (!response.data?.updateBotSettingsV2) {
                        throw new Error("Failed to update bot settings")
                    }
                    return response.data?.updateBotSettingsV2
                },
                {
                    showSuccessToast: true,
                    showErrorToast: true,
                }
            )
            if (success) {
                await queryBotV2Swr.mutate()
                resetForm()
            }
        },
    })
}
