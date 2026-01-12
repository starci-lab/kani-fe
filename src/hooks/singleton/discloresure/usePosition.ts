import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const usePositionDisclosureCore = () => useDisclosure()

export const usePositionDisclosure = () => {
    const { position } = use(DiscloresureContext)!
    return position
}