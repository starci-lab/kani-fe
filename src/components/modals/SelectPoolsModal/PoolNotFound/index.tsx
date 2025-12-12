import React from "react"
import { KaniImage } from "@/components/atomic"
import { iconAssetConfig } from "@/assets/icon"

export const PoolNotFound = () => {
    return (
        <div className="grid place-items-center gap-4">
            <KaniImage src={iconAssetConfig().icon.kani.notFound} alt="Pool Not Found" className="w-[80%] mx-auto" />
            <div className="text-sm">No pools available. Try adjusting your filters.</div>
        </div>
    )
}