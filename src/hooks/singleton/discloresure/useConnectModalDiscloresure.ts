import { useDisclosure } from "@heroui/react"
import { useContext } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useConnectModalDisclosureCore = () => useDisclosure()

export const useConnectModalDisclosure = () => {
    const { connectModal } = useContext(DiscloresureContext)!
    return connectModal
}