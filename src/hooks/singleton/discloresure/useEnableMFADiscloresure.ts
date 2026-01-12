import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useEnableMFADisclosureCore = () => useDisclosure() 

export const useEnableMFADisclosure = () => {
    const { enableMFA } = use(DiscloresureContext)!
    return enableMFA
}