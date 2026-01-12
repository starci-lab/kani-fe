import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useMenuDisclosure = () => {
    const { menu } = use(DiscloresureContext)!
    return menu
}
export const useMenuDisclosureCore = () => useDisclosure()