import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useVerifyDisclosureCore = () => useDisclosure()

export const useVerifyDisclosure = () => {
    const { verify } = use(DiscloresureContext)!
    return verify
}