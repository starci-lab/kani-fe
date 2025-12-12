import { KaniButton } from "@/components/atomic"
import { TooltipTitle } from "@/components/reuseable"
import { useSelectPoolsDisclosure } from "@/hooks/singleton"
import { Spacer } from "@heroui/react"
import React from "react"

export const SelectPools = () => {
    const { onOpen } = useSelectPoolsDisclosure()
    return (
        <div className="flex flex-col gap-2">
            <TooltipTitle
                title="Pools"
                tooltipString="This is the pools of your bot"
                isRequired
            />
            <div>
                <div className="text-sm text-foreground-500">
                Kani automatically selects the best-performing pools for you. You can still choose manually if you prefer.
                </div>
                <Spacer y={4} />
                <KaniButton
                    variant="bordered"
                    onPress={onOpen}
                >
                    Select Pools
                </KaniButton>
            </div>
        </div>
    )
}