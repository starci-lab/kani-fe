import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useConnectDisclosureCore = () => useDisclosure()

export const useConnectDisclosure = () => {
    const { connect } = use(DiscloresureContext)!
    return connect
}