import { KaniSpinner } from "@/components/atomic"
import React from "react"

export const WithdrawalExecuting = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <KaniSpinner/>
        </div>
    )
}