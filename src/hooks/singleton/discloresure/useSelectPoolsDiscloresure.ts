import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useSelectPoolsDisclosureCore = () => useDisclosure()

export const useSelectPoolsDisclosure = () => {
    const { selectPools } = use(DiscloresureContext)!
    return selectPools
}