import { useDisclosure } from "@heroui/react"
import { use } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useSignInDisclosureCore = () => useDisclosure() 

export const useSignInDisclosure = () => {
    const { signIn } = use(DiscloresureContext)!
    return signIn
}