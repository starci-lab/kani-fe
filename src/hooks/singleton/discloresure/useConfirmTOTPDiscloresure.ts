import { useDisclosure } from "@heroui/react"
import { useContext } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useConfirmTOTPDisclosureCore = () => useDisclosure()

export const useConfirmTOTPDisclosure = () => {
    const { confirmTOTPModal } = useContext(DiscloresureContext)!
    return confirmTOTPModal
}