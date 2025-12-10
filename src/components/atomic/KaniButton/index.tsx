import { Button, ButtonProps } from "@heroui/react"
import React, { forwardRef } from "react"
export const KaniButton = forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        return <Button {...props} ref={ref} />
    }
)
KaniButton.displayName = "KaniButton"
