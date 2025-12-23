import { 
    MutationVerifySignInOtpRequest, 
    mutationVerifySignInOtp 
} from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"
import { 
    LocalStorageKey, 
    setLocalStorageItem 
} from "@/modules/storages"

export const useVerifySignInOtpSwrMutationCore = () => {
    const swrMutation = useSWRMutation(
        ["VERIFY_SIGN_IN_OTP_SWR_MUTATION"],
        async (
            _,
            {
                arg,
            }: {
                arg: MutationVerifySignInOtpRequest
            }
        ) => {
            const data = await mutationVerifySignInOtp({
                request: arg,
            })
            if (!data?.data?.verifySignInOtp) {
                throw new Error("Failed to verify Sign In OTP")
            }
            const accessToken = data.data.verifySignInOtp.data?.accessToken
            if (accessToken) {
                setLocalStorageItem(
                    LocalStorageKey.AccessToken, 
                    accessToken
                )
            }
            return data
        }
    )
    return swrMutation
}

export const useVerifySignInOtpSwrMutation = () => {
    const { verifySignInOtpSwrMutation } = use(SwrContext)!
    return verifySignInOtpSwrMutation
}
