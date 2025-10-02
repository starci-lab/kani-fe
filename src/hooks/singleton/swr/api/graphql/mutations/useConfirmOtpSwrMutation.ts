import { MutationConfirmTotpParams, mutationConfirmTotp } from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"
import { SessionStorage, SessionStorageKey } from "@/modules"
import { setTotpVerified, useAppDispatch } from "@/redux"

export const useConfirmOtpSwrMutationCore = () => {
    const dispatch = useAppDispatch()
    const swrMutation = useSWRMutation(
        ["CONFIRM_OTP_SWR_MUTATION"],
        async (
            _,
            {
                arg,
            }: {
                arg: MutationConfirmTotpParams
            }
        ) => {
            const data = await mutationConfirmTotp({
                headers: arg.headers,
            })
            const accessToken = data.data?.confirmTotp.data?.accessToken
            // if access token is returned, store it in session storage
            if (accessToken) {
                new SessionStorage().setItem(SessionStorageKey.AccessToken, accessToken)
            }
            // if this api is called, set totp verified to true
            dispatch(setTotpVerified(true))
            return data
        }
    )
    return swrMutation
}

export const useConfirmOtpSwrMutation = () => {
    const { confirmOtpMutation } = useContext(SwrContext)!
    return confirmOtpMutation
}