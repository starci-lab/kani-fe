import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useUpdatePoolsDisclosureCore = () => useDisclosure()

export const useUpdatePoolsDisclosure = () => {
    const { updatePools } = use(DiscloresureContext)!
    return updatePools
}