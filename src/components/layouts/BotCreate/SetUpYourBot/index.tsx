import React from "react"
import {
    KaniInput,
} from "@/components/atomic"
import { Spacer } from "@heroui/react"
import { TooltipTitle } from "@/components/reuseable"
import { useCreateBotFormik } from "@/hooks/singleton"
import { SelectChainDropdown } from "./SelectChainDropdown"
import { SelectPools } from "./SelectPools"
export const SetUpYourBot = () => {
    const formik = useCreateBotFormik()
    return (
        <div>
            <div className="text-2xl font-bold text-primary">Set Up Your Bot</div>
            <Spacer y={6} />
            <div className="flex flex-col gap-2">
                <TooltipTitle
                    title="Bot Name"
                    tooltipString="This is the name of your bot"
                    isRequired
                />
                <KaniInput
                    placeholder="Enter your bot name"
                    value={formik.values.name}
                    onValueChange={(value) => formik.setFieldValue("name", value)}
                    onBlur={() => formik.setFieldTouched("name", true)}
                    isInvalid={!!(formik.errors.name && formik.touched.name)}
                    errorMessage={formik.errors.name}
                />
            </div>
            <Spacer y={4} />
            <div className="flex flex-col gap-2">
                <TooltipTitle
                    title="Chain"
                    tooltipString="This is the chain of your bot"
                    isRequired
                />
                <div className="w-fit">
                    <SelectChainDropdown />
                </div>
            </div>
            <Spacer y={4} />
            <SelectPools />
        </div>
    )
}
