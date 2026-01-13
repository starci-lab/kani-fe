import { useFormik } from "formik"
import * as Yup from "yup"
import { runGraphQLWithToast } from "@/components/toasts"
import { useUpdateBotSettingsV2SwrMutation } from "../../swr"
import { useQueryBotV2Swr } from "../../swr"
import { useAppSelector } from "@/redux"

export interface UpdateBotSettingsFormikValues {
    name?: string;
}

const initialValues: UpdateBotSettingsFormikValues = {
}

const validationSchema = Yup.object({
    name: Yup.string().nullable().optional(),
})

export const useUpdateBotNameFormikCore = () => {
    const botId = useAppSelector((state) => state.bot.bot?.id)
    const bot = useAppSelector((state) => state.bot.bot)
    const updateBotSettingsV2Mutation = useUpdateBotSettingsV2SwrMutation()
    const queryBotV2Swr = useQueryBotV2Swr()
    const formik = useFormik<UpdateBotSettingsFormikValues>({
        initialValues: {
            ...initialValues,
            name: bot?.name,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            if (!values.name) {
                throw new Error("Name is required")
            }
            const success = await runGraphQLWithToast(
                async () => {
                    if (!botId) {
                        throw new Error("Bot ID is required")
                    }
                    const response = await updateBotSettingsV2Mutation.trigger({
                        request: {
                            id: botId,
                            name: values.name,
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
                })
            if (success) {
                await queryBotV2Swr.mutate()
                resetForm()
            }
        },
    })
    return formik
}
