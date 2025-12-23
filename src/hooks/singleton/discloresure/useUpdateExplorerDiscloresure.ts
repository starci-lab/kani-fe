import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useUpdateExplorerDisclosureCore = () => useDisclosure()

export const useUpdateExplorerDisclosure = () => {
    const { updateExplorerModal } = use(DiscloresureContext)!
    return updateExplorerModal
}