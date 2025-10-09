import { useDisclosure } from "@heroui/react"
import { useContext } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useDepositModalDisclosureCore = () => useDisclosure()

export const useDepositModalDisclosure = () => {
    const { depositModal } = useContext(DiscloresureContext)!
    return depositModal
}