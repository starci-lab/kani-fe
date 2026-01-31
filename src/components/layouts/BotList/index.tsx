import React from "react"
import { BotNotFound } from "./BotNotFound"
import { Bots } from "./Bots"
import { useQueryBotsV2Swr } from "@/hooks/singleton"
import { BotsSkeleton } from "./BotsSkeleton"
import { useAppSelector } from "@/redux"
import { KaniButton } from "../../atomic"
import { useRouter } from "next/navigation"
import { Spacer } from "@heroui/react"
import { PlusIcon } from "@phosphor-icons/react"
import { DisplayModeToggle } from "./DisplayModeToggle"
import { paths } from "@/resources/path"
export const BotList = () => {
    const queryBotsV2Swr = useQueryBotsV2Swr()
    const bots = useAppSelector((state) => state.bot.bots)
    const router = useRouter()
    const accountLimits = useAppSelector((state) => state.static.accountLimits)
    // render bots based on the display mode
    const renderBots = () => {
        if (!queryBotsV2Swr.data || queryBotsV2Swr.isLoading) {
            return <BotsSkeleton/>
        }
        if (!bots?.length) {
            return <BotNotFound/>
        }
        return <Bots/>
    }
    return (
        <div> 
            <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">Bots</div>
            </div>
            <Spacer y={3} />
            <div className="text-sm text-foreground-500">Individual users can create and run up to {accountLimits?.maxBotsPerAccount}  bots at the same time.</div>
            <Spacer y={6} />
            <div className="flex items-center justify-between flex-col gap-3 sm:flex-row flex-col-reverse">
                <DisplayModeToggle />
                <KaniButton className="md:w-fit w-full" color="primary" startContent={<PlusIcon className="w-5 h-5"/>} onPress={() => router.push(paths().bots().create())}>
                    Create Bot
                </KaniButton>
            </div>
            <Spacer y={6} />
            {renderBots()}
        </div>
    )
}