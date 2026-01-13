import React from "react"
import {
    KaniInput,
    KaniButton,
    KaniSwitch,
    KaniCheckbox,
} from "@/components/atomic"
import { Spacer } from "@heroui/react"
import { TooltipTitle } from "@/components/reuseable"
import { useCreateBotFormik } from "@/hooks/singleton"
import { SelectChainDropdown } from "./SelectChainDropdown"
import { SelectPools } from "./SelectPools"
import { SelectTokens } from "./SelectTokens"
export const SetUpYourBot = () => {
    const formik = useCreateBotFormik()
    return (
        <div>
            <div className="text-2xl font-bold">Set Up Your Bot</div>
            <Spacer y={6} />
            <div className="flex flex-col gap-3">
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
            <Spacer y={6} />
            <div className="flex flex-col gap-3">
                <TooltipTitle
                    title="Chain"
                    isRequired
                />
                <div className="w-fit">
                    <SelectChainDropdown />
                </div>
            </div>
            <Spacer y={6} />
            <SelectTokens />
            <Spacer y={6} />
            <SelectPools />
            <Spacer y={6} />
            <div>
                <TooltipTitle
                    title="Exit To USDC"
                    tooltipString="This is the exit to USDC of your bot"
                    isRequired
                />
                <Spacer y={2} />
                <div className="text-xs text-foreground-500">
                If enabled, your bot will automatically move to USDC when a major price drop is detected.
                </div>
                <Spacer y={3} />
                <KaniSwitch
                    isSelected={formik.values.isExitToUsdc}
                    onValueChange={(value) => formik.setFieldValue("isExitToUsdc", value)}
                />
            </div>
            <Spacer y={8} />
            <div className="flex gap-2">
                <KaniCheckbox
                    isSelected={formik.values.isTermsOfServiceAccepted}
                    onValueChange={(value) => formik.setFieldValue("isTermsOfServiceAccepted", value)}
                />
                <div className="text-xs text-foreground-500">
                    I accept the Terms of Service and acknowledge the risks involved.
                </div>
            </div>
            <Spacer y={3} />
            <KaniButton 
                isDisabled={!formik.isValid}
                size="lg"
                isLoading={formik.isSubmitting}
                color="primary" onPress={
                    () => {
                        formik.submitForm()
                    }
                }>
                Create Bot
            </KaniButton>
        </div>
    )
}
