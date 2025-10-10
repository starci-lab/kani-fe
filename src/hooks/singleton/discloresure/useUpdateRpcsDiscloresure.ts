import { useDisclosure } from "@heroui/react"
import { useContext } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useUpdateRpcsDisclosureCore = () => useDisclosure()

export const useUpdateRpcsDisclosure = () => {
    const { updateRpcsModal } = useContext(DiscloresureContext)!
    return updateRpcsModal
}