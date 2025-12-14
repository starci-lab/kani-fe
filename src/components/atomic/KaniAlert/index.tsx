import { Alert, AlertProps, cn } from "@heroui/react"
import React from "react"

export const KaniAlert = (props: AlertProps) => {
    return <Alert {...props} classNames={{ title: cn("mb-1", props.classNames?.title) }} />
}   