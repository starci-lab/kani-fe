import React from "react"
import { BotNotFound } from "./BotNotFound"
import { Bots } from "./Bots"
import { useQueryBotsV2Swr } from "@/hooks/singleton"
import { BotsSkeleton } from "./BotsSkeleton"
import { useAppSelector } from "@/redux"
import { KaniButton, KaniInput } from "../../atomic"
import { useRouter } from "next/navigation"
import { paths } from "@/modules"
import { Spacer } from "@heroui/react"
import { PlusIcon, SortAscendingIcon } from "@phosphor-icons/react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr"
import { DisplayModeToggle } from "./DisplayModeToggle"
export const BotList = () => {
    const queryBotsV2Swr = useQueryBotsV2Swr()
    const bots = useAppSelector((state) => state.bot.bots)
    const router = useRouter()
    const accountLimits = useAppSelector((state) => state.static.accountLimits)
    // render bots based on the display mode
    const renderBots = () => {
        if (queryBotsV2Swr.isLoading) {
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
            <Spacer y={4} />
            <div className="text-sm text-foreground-500">Individual users can create and run up to {accountLimits?.maxBotsPerAccount}  bots at the same time.</div>
            <Spacer y={12} />
            <div className="flex items-center justify-between">
                <DisplayModeToggle />
                <div className="flex items-center gap-4">
                    <div className="flex items-center">
                        <KaniInput
                            classNames={{
                                inputWrapper: "!rounded-r-none w-[150px]",
                            }}
                            startContent={<MagnifyingGlassIcon className="w-5 h-5 text-foreground-500"/>}
                            placeholder="Search"
                            value={""}
                            onValueChange={() => {}}
                        />
                        <KaniButton variant="flat" isIconOnly className="rounded-l-none" onPress={() => router.push(paths().bots().create())}>
                            <SortAscendingIcon className="w-5 h-5 text-foreground-500"/>
                        </KaniButton>
                    </div>
                    <KaniButton color="primary" startContent={<PlusIcon className="w-5 h-5"/>} onPress={() => router.push(paths().bots().create())}>
                        Create Bot
                    </KaniButton>
                </div>
            </div>
            <Spacer y={6} />
            {renderBots()}
        </div>
    )
}