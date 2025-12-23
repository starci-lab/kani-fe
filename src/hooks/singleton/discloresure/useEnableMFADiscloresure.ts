import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useEnableMFAModalDisclosureCore = () => useDisclosure() 

export const useEnableMFAModalDisclosure = () => {
    const { enableMFAModal } = use(DiscloresureContext)!
    return enableMFAModal
}