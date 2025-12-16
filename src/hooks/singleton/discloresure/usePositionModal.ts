import { useDisclosure } from "@heroui/react"
import { useContext } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const usePositionModalDisclosureCore = () => useDisclosure()

export const usePositionModalDisclosure = () => {
    const { positionModal } = useContext(DiscloresureContext)!
    return positionModal
}