import { useDisclosure } from "@heroui/react"
import { useContext } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useVerifyDisclosureCore = () => useDisclosure()

export const useVerifyDisclosure = () => {
    const { verifyModal } = useContext(DiscloresureContext)!
    return verifyModal
}