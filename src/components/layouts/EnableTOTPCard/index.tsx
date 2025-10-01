import { KaniCard } from "@/components"
import { EnableTOTPCardPage, useAppSelector } from "@/redux"
import React from "react"
import { ScanTOTP } from "./ScanTOTP"
import { VerifyTOTP } from "./VerifyTOTP"

export const EnableTOTPCard = () => {
    const enableTOTPCard = useAppSelector(state => state.page.enableTOTPCard)
    const renderContent = () => {
        switch (enableTOTPCard) {
        case EnableTOTPCardPage.ScanTOTP:
            return <ScanTOTP />
        case EnableTOTPCardPage.VerifyTOTP:
            return <VerifyTOTP />
        }
    }
    return (
        <KaniCard className="w-[400px]">
            {renderContent()}
        </KaniCard>
    )
}
