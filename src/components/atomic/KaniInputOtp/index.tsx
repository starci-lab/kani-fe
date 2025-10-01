import React from "react"
import { InputOtp, InputOtpProps } from "@heroui/react"

export const KaniInputOtp = (props: InputOtpProps) => {
    return <InputOtp {...props} classNames={{
        errorMessage: "text-center"
    }} errorMessage="Invalid code" />
}