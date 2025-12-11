import React from "react"
import { KaniButton, KaniImage, KaniLink } from "@/components/atomic"
import { useRouter } from "next/navigation"
import { paths } from "@/modules"
export const BotNotFound = () => {
    const router = useRouter()
    return (
        <div className="grid place-items-center gap-4">
            <KaniImage src="/kani/kani-default.png" alt="Bot Not Found" className="w-[80%] mx-auto" />
            <div className="text-sm">Create your first Kanibot today and unlock 100%+ APR. <KaniLink underline="always">Learn more</KaniLink></div>
            <KaniButton size="lg" color="primary" onClick={() => router.push(paths().bots().create())}>Create Bot</KaniButton>
        </div>
    )
}