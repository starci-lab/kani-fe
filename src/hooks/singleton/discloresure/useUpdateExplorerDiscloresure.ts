import { useDisclosure } from "@heroui/react"
import { useContext } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useUpdateExplorerDisclosureCore = () => useDisclosure()

export const useUpdateExplorerDisclosure = () => {
    const { updateExplorerModal } = useContext(DiscloresureContext)!
    return updateExplorerModal
}