import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useUpdateRpcsDisclosureCore = () => useDisclosure()

export const useUpdateRpcsDisclosure = () => {
    const { updateRpcs } = use(DiscloresureContext)!
    return updateRpcs
}