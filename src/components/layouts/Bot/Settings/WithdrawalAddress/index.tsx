import { KaniButton, KaniInput } from "../../../../atomic"
import { TooltipTitle } from "../../../../reuseable"
import React from "react"
import { Spacer } from "@heroui/react"

export const WithdrawalAddress = () => {
    return (
        <div>
            <TooltipTitle
                title="Withdrawal Address"
            />
            <Spacer y={2} />
            <div className="text-xs text-foreground-500">
            The address where your funds will be sent when withdrawn.
            </div>
            <Spacer y={3} />
            <KaniInput
                label=""
                labelPlacement="outside"
                placeholder="Enter withdrawal address"
                value="123"
            />
            <Spacer y={3} />
            <div className="flex gap-2">
                <KaniButton color="primary" variant="light">
                Reset
                </KaniButton>
                <KaniButton color="primary" variant="flat">
                Save
                </KaniButton>
            </div>
        </div>
    )
}