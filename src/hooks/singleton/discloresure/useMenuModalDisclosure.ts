import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useMenuModalDisclosure = () => {
    const { menuModal } = use(DiscloresureContext)!
    return menuModal
}
export const useMenuModalDisclosureCore = () => useDisclosure()