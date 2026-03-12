import { Spacer } from "@heroui/react"
import { TooltipTitle } from "../../../reuseable"
import React from "react"
import { ViolateIndicator } from "../../../reuseable"
import { useCreateBotFormik } from "@/hooks/singleton"
import { KaniLink } from "@/components/atomic"

export const ViolateIndicators = () => {
    const formik = useCreateBotFormik()
    return (
        <div>
            <TooltipTitle isRequired title="Violate Indicators" />
            <Spacer y={1.5} />
            <div className="text-xs text-foreground-500">
            Violation indicators help determine when the bot should open a new position or close an existing one. <KaniLink className="text-xs" href="https://docs.kani.xyz/docs/how-to-use/violate-indicators" target="_blank">Learn more</KaniLink>
            </div>
            <Spacer y={1.5} />
            <Spacer y={3} />
            <div className="grid grid-cols-1 gap-3">
                {
                    formik.values.violateIndicators.map((violateIndicator) => {
                        return <ViolateIndicator 
                            key={violateIndicator.id} 
                            violateIndicator={violateIndicator} 
                        />
                    })
                }
            </div>
        </div>
    )
}