import React from "react"
import { KaniButton, KaniImage, KaniLink } from "@/components/atomic"
import { useRouter } from "next/navigation"
import { paths } from "@/modules"
import { iconAssetConfig } from "@/assets/icon"
export const BotNotFound = () => {
    const router = useRouter()
    return (
        <div className="grid place-items-center gap-4">
            <KaniImage src={iconAssetConfig().icon.kani.default} alt="Bot Not Found" className="w-[80%] mx-auto" />
            <div className="text-sm">Create your first Kanibot today and unlock 100%+ APR. <KaniLink underline="always">Learn more</KaniLink></div>
            <KaniButton size="lg" color="primary" onClick={() => router.push(paths().bots().create())}>Create Bot</KaniButton>
        </div>
    )
}