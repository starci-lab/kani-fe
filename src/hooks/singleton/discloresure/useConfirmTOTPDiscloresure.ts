import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useConfirmTOTPDisclosureCore = () => useDisclosure()

export const useConfirmTOTPDisclosure = () => {
    const { confirmTOTP } = use(DiscloresureContext)!
    return confirmTOTP
}