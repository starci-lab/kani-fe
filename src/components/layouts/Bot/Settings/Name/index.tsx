import { KaniButton, KaniInput } from "../../../../atomic"
import { TooltipTitle } from "../../../../reuseable"
import React from "react"
import { Spacer } from "@heroui/react"
import { useUpdateBotNameFormik } from "@/hooks/singleton"

export const Name = () => {
    const formik = useUpdateBotNameFormik()
    return (
        <div>
            <TooltipTitle
                title="Name"
            />
            <Spacer y={1.5} />
            <div className="text-xs text-foreground-500">
            A descriptive name to help you recognize this bot. Only visible to you.
            </div>
            <Spacer y={3} />
            <KaniInput
                label=""
                labelPlacement="outside"
                placeholder="Enter bot name"
                value={formik.values.name}
                onValueChange={(value) => formik.setFieldValue("name", value)}
                onBlur={() => formik.setFieldTouched("name", true)}
                isInvalid={!!(formik.errors.name && formik.touched.name)}
                errorMessage={formik.errors.name}
            />
            <Spacer y={4} />
            <div className="flex gap-2">
                <KaniButton color="primary" variant="flat" onPress={() => formik.submitForm()}>
                    Save
                </KaniButton>
                <KaniButton color="primary" variant="light" onPress={() => formik.resetForm()}>
                Reset
                </KaniButton>
            </div>
        </div>
    )
}