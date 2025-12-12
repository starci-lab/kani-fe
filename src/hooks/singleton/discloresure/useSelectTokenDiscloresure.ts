import { useDisclosure } from "@heroui/react"
import { useContext } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useSelectTokenDisclosureCore = () => useDisclosure()

export const useSelectTokenDisclosure = () => {
    const { selectTokenModal } = useContext(DiscloresureContext)!
    return selectTokenModal
}