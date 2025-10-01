import { MutationConfirmTotpRequest, mutationConfirmTotp } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"
import { SessionStorage, SessionStorageKey } from "@/modules"

export const useConfirmOtpSwrMutationCore = () => {
    const swrMutation = useSWRMutation(
        ["CONFIRM_OTP_SWR_MUTATION"],
        async (
            _,
            {
                arg,
            }: {
                arg: MutationConfirmTotpRequest
            }
        ) => {
            const data = await mutationConfirmTotp({
                request: arg,
            })
            const accessToken = data.data?.confirmTotp.data?.accessToken
            // if access token is returned, store it in session storage
            if (accessToken) {
                new SessionStorage().setItem(SessionStorageKey.AccessToken, accessToken)
            }
            return data
        }
    )
    return swrMutation
}

export const useConfirmOtpSwrMutation = () => {
    const { confirmOtpMutation } = useContext(SwrContext)!
    return confirmOtpMutation
}