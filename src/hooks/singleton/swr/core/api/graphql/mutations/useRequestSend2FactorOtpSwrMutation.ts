import { 
    mutationRequestSend2FactorOtp 
} from "@/modules/api"
import useSWRMutation from "swr/mutation"
import { useAppSelector } from "@/redux"

export const useRequestSend2FactorOtpSwrMutationCore = () => {
    const accessToken = useAppSelector(state => state.session.accessToken)
    const swrMutation = useSWRMutation(
        ["REQUEST_SEND_2_FACTOR_OTP_SWR_MUTATION"],
        async () => {
            if (!accessToken) {
                throw new Error("Access token is required")
            }
            const data = await mutationRequestSend2FactorOtp({
                token: accessToken,
            })
            if (!data?.data?.requestSend2FactorOtp) {
                throw new Error("Failed to request Send 2 Factor OTP")
            }
            // retrive the access token and refresh token from the response
            return data
        }
    )
    return swrMutation
}
