import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useSortByDisclosureCore = () => useDisclosure()

export const useSortByDisclosure = () => {
    const { sortBy } = use(DiscloresureContext)!
    return sortBy
}