import { useDisclosure } from "@heroui/react"
import { useContext } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useSelectPoolsDisclosureCore = () => useDisclosure()

export const useSelectPoolsDisclosure = () => {
    const { selectPoolsModal } = useContext(DiscloresureContext)!
    return selectPoolsModal
}