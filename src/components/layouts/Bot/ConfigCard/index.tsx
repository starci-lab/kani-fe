import { KaniCard, KaniCardBody } from "@/components"
import { Spacer } from "@heroui/react"
import React from "react"
import { WalletSection } from "./WalletSection"
import { ExplorerSection } from "./ExplorerSection"

export const ConfigCard = () => {
    return (
        <KaniCard>
            <KaniCardBody>
                <WalletSection />
                <Spacer y={6} />
                <ExplorerSection />
            </KaniCardBody>
        </KaniCard>
    )
}