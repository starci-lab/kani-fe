import { TooltipTitle } from "../../../../reuseable"
import { KaniSwitch } from "../../../../atomic"
import React from "react"
import { Spacer } from "@heroui/react"
import { setBotIsExitToUsdc, useAppDispatch, useAppSelector } from "@/redux"
import { useUpdateBotSettingsV2SwrMutation } from "@/hooks/singleton"
import { runGraphQLWithToast } from "../../../../toasts"
import { useQueryBotV2Swr } from "@/hooks/singleton"

export const ExitToUsdc = () => {
    const bot = useAppSelector((state) => state.bot.bot)
    const botId = useAppSelector((state) => state.bot.bot?.id)
    const dispatch = useAppDispatch()
    const updateBotSettingsV2Mutation = useUpdateBotSettingsV2SwrMutation()
    const queryBotV2Swr = useQueryBotV2Swr()
    return (
        <div>
            <TooltipTitle title="Exit To USDC" />
            <Spacer y={2} />
            <div className="text-xs text-foreground-500">
                If enabled, your bot will automatically move to USDC when a major price drop is detected.
            </div>
            <Spacer y={4} />
            <KaniSwitch
                isSelected={bot?.isExitToUsdc}
                onValueChange={async (value) => {
                    if (!botId) {
                        throw new Error("Bot ID is required")
                    }
                    dispatch(setBotIsExitToUsdc(value))
                    const success = await runGraphQLWithToast(
                        async () => {
                            const response = await updateBotSettingsV2Mutation.trigger({
                                request: {
                                    id: botId,
                                    isExitToUsdc: value,
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
                    }
                }
                }
            />
        </div>
    )
}