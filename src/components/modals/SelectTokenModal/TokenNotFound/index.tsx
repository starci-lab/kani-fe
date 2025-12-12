import React from "react"
import { KaniImage } from "@/components/atomic"
import { iconAssetConfig } from "@/assets/icon"

export const TokenNotFound = () => {
    return (
        <div className="grid place-items-center gap-4">
            <KaniImage src={iconAssetConfig().icon.kani.notFound} alt="Token Not Found" className="w-[80%] mx-auto" />
            <div className="text-sm">No tokens available. Try adjusting your filters.</div>
        </div>
    )
}