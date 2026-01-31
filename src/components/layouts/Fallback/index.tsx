import { KaniSpinner } from "@/components/atomic"
import { Spacer } from "@heroui/react"
import React from "react"

export const Fallback = () => {
    return (
        <div className="grid place-items-center h-screen w-screen">
            <KaniSpinner size="lg" />
            <Spacer y={4} />
            <div className="text-foreground-500">Loading...</div>
        </div>
    )
}