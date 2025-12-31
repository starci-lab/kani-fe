import React from "react"
import { KaniButton, KaniImage, KaniLink } from "@/components/atomic"
import { useRouter } from "next/navigation"
import { paths } from "@/modules"
import { iconAssetConfig } from "@/assets/icon"
import { Spacer } from "@heroui/react"
export const BotNotFound = () => {
    const router = useRouter()
    return (
        <div className="grid place-items-center">
            <KaniImage src={iconAssetConfig().icon.kani.default} alt="Bot Not Found" className="w-[80%] mx-auto" />
            <Spacer y={6} />
            <div className="flex flex-col items-center gap-4">
                <div className="text-sm text-center">Create your first Kanibot today and unlock 100%+ APR. <KaniLink underline="always" className="text-sm">Learn more</KaniLink></div>
                <KaniButton size="lg" color="primary" onClick={() => router.push(paths().bots().create())}>Create Bot</KaniButton>
            </div>
        </div>
    )
}