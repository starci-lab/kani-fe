import { KaniSpinner } from "@/components/atomic"
import { Spacer } from "@heroui/react"
import React from "react"
import { useAppSelector } from "@/redux"

export const WithdrawalExecuting = () => {
    const confirmWithdrawal = useAppSelector((state) => state.socket.confirmWithdrawal)
    return (
        <>
            {!confirmWithdrawal ? (
                <div className="flex flex-col items-center justify-center h-[200px]">
                    <KaniSpinner variant="wave" />
                    <Spacer y={4} />
                    <div className="text-foreground-500 text-center text-sm">Processing withdrawal...</div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[200px]">
                    <div className="text-foreground-500 text-center text-sm">Withdrawing is in progress...</div>
                </div>
            )}
        </>
    )
}