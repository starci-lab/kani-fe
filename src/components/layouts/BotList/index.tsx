import React from "react"
import { BotNotFound } from "./BotNotFound"
import { Bots } from "./Bots"
import { useQueryBots2Swr } from "@/hooks/singleton"
import { BotsSkeleton } from "./BotsSkeleton"
import { useAppSelector } from "@/redux"
import { KaniButton, KaniInput } from "../../atomic"
import { useRouter } from "next/navigation"
import { paths } from "@/modules"
import { Spacer } from "@heroui/react"
import { FunnelIcon, PlusIcon, SortAscendingIcon } from "@phosphor-icons/react"
import { DotsThreeIcon, MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr"
export const BotList = () => {
    const swr = useQueryBots2Swr()
    const bots = useAppSelector((state) => state.bot.bots)
    const router = useRouter()
    // render bots based on the display mode
    const renderBots = () => {
        if (swr.isLoading) {
            return <BotsSkeleton/>
        }
        if (!bots?.length) {
            return <BotNotFound/>
        }
        return <Bots/>
    }
    return (
        <div> 
            <div className="flex items-center flex-col sm:flex-row justify-between">
                <div className="text-2xl font-bold text-primary">Bots</div>
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
                        <KaniButton variant="flat" isIconOnly className="rounded-none" onPress={() => router.push(paths().bots().create())}>
                            <FunnelIcon className="w-5 h-5 text-foreground-500"/>
                        </KaniButton>
                        <KaniButton variant="flat" isIconOnly className="rounded-l-none" onPress={() => router.push(paths().bots().create())}>
                            <SortAscendingIcon className="w-5 h-5 text-foreground-500"/>
                        </KaniButton>
                    </div>
                    <KaniButton color="primary" startContent={<PlusIcon className="w-5 h-5"/>} onPress={() => router.push(paths().bots().create())}>
                        Create Bot
                    </KaniButton>
                </div>
            </div>
            <Spacer y={12} />
            {renderBots()}
        </div>
    )
}