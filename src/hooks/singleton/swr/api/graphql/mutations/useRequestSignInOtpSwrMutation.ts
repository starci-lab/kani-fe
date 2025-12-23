import { 
    MutationRequestSignInOtpRequest, 
    mutationRequestSignInOtp 
} from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { SwrContext } from "../../../SwrContext"
import { use } from "react"

export const useRequestSignInOtpSwrMutationCore = () => {
    const swrMutation = useSWRMutation(
        ["REQUEST_SIGN_IN_OTP_SWR_MUTATION"],
        async (
            _,
            {
                arg,
            }: {
                arg: MutationRequestSignInOtpRequest
            }
        ) => {
            const data = await mutationRequestSignInOtp({
                request: arg,
            })
            if (!data?.data?.requestSignInOtp) {
                throw new Error("Failed to request Sign In OTP")
            }
            // retrive the access token and refresh token from the response
            return data
        }
    )
    return swrMutation
}

export const useRequestSignInOtpSwrMutation = () => {
    const { requestSignInOtpSwrMutation } = use(SwrContext)!
    return requestSignInOtpSwrMutation
}
