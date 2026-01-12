import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useExportPrivateKeyDisclosureCore = () => useDisclosure()

export const useExportPrivateKeyDisclosure = () => {
    const { exportPrivateKey } = use(DiscloresureContext)!
    return exportPrivateKey
}