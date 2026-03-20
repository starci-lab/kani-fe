import { Spacer } from "@heroui/react"
import { TooltipTitle } from "../../../reuseable"
import React from "react"
import {
    KaniButton,
    KaniLink,
} from "@/components/atomic"
import { useViolateIndicatorRulesDisclosure } from "@/hooks/singleton"

export const ViolateIndicators = () => {
    const { onOpen } = useViolateIndicatorRulesDisclosure()
    return (
        <div>
            <TooltipTitle isRequired title="Violate Indicators" />
            <Spacer y={1.5} />
            <div className="text-xs text-foreground-500">
            Violation indicators help determine when the bot should open a new position or close an existing one. <KaniLink className="text-xs" href="https://docs.kani.xyz/docs/how-to-use/violate-indicators" target="_blank">Learn more</KaniLink>
            </div>
            <Spacer y={3} />
            <KaniButton
                variant="flat"
                onPress={() => {
                    // Ensure the parent drawer is open (no-op if already open).
                    onOpen()
                }}
            >
                Edit Rules
            </KaniButton>
        </div>
    )
}