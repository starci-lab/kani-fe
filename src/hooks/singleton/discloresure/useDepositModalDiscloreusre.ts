import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useDepositModalDisclosureCore = () => useDisclosure()

export const useDepositModalDisclosure = () => {
    const { depositModal } = use(DiscloresureContext)!
    return depositModal
}