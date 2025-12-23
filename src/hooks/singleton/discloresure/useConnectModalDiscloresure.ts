import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useConnectModalDisclosureCore = () => useDisclosure()

export const useConnectModalDisclosure = () => {
    const { connectModal } = use(DiscloresureContext)!
    return connectModal
}