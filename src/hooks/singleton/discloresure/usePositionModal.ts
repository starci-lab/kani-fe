import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const usePositionModalDisclosureCore = () => useDisclosure()

export const usePositionModalDisclosure = () => {
    const { positionModal } = use(DiscloresureContext)!
    return positionModal
}