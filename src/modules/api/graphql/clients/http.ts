import { HttpLink } from "@apollo/client"
import { publicEnv } from "@/modules/env"

export const createHttpLink = (withCredentials = false) => {
    return new HttpLink({
        uri: `${publicEnv().apiBaseUrl}/graphql`,
        credentials: withCredentials ? "include" : "same-origin",
    })
}