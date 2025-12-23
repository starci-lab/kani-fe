import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useExportPrivateKeyModalDisclosureCore = () => useDisclosure()

export const useExportPrivateKeyModalDisclosure = () => {
    const { exportPrivateKeyModal } = use(DiscloresureContext)!
    return exportPrivateKeyModal
}