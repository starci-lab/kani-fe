import { useDisclosure } from "@heroui/react"
import { useContext } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useEnableMFAModalDisclosureCore = () => useDisclosure() 

export const useEnableMFAModalDisclosure = () => {
    const { enableMFAModal } = useContext(DiscloresureContext)!
    return enableMFAModal
}