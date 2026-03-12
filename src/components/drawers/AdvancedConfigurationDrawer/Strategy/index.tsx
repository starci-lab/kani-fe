import { Spacer } from "@heroui/react"
import { TooltipTitle } from "../../../reuseable"
import React from "react"
import { RangeTier } from "@/modules/types"
import { StrategyCard } from "../../../reuseable"
import { useCreateBotFormik } from "@/hooks/singleton"
import { KaniLink } from "@/components/atomic"

export const Strategy = () => {
    const formik = useCreateBotFormik()
    return (
        <div>
            <TooltipTitle isRequired title="Strategy" />
            <Spacer y={1.5} />
            <div className="text-xs text-foreground-500">
                Select the strategy you want to use for your bot. <KaniLink className="text-xs" href="https://docs.kani.xyz/docs/how-to-use/strategy" target="_blank">Learn more</KaniLink>
            </div>
            <Spacer y={3} />
            <div className="grid grid-cols-1 gap-3">
                {
                    Object.values(RangeTier).map((rangeTier) => (
                        <StrategyCard 
                            key={rangeTier} 
                            rangeTier={rangeTier} 
                            onPress={() => {
                                formik.setFieldValue("rangeTier", rangeTier)
                            }} 
                            isSelected={formik.values.rangeTier === rangeTier
                            } 
                        />
                    ))
                }
            </div>
        </div>
    )
}