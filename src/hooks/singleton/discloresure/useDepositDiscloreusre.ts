import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useDepositDisclosureCore = () => useDisclosure()

export const useDepositDisclosure = () => {
    const { deposit } = use(DiscloresureContext)!
    return deposit
}