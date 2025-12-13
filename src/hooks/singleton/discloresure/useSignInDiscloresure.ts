import { useDisclosure } from "@heroui/react"
import { useContext } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useSignInDisclosureCore = () => useDisclosure() 

export const useSignInDisclosure = () => {
    const { signInModal } = useContext(DiscloresureContext)!
    return signInModal
}