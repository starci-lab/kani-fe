import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useSelectTokenDisclosureCore = () => useDisclosure()

export const useSelectTokenDisclosure = () => {
    const { selectTokenModal } = use(DiscloresureContext)!
    return selectTokenModal
}