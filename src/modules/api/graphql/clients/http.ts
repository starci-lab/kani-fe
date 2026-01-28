import { HttpLink } from "@apollo/client"
import { publicEnv } from "@/resources/env"

export const createHttpLink = (withCredentials = false, headers: Record<string, string> = {}) => {
    return new HttpLink({
        uri: `${publicEnv().api.graphql}`,
        credentials: withCredentials ? "include" : "same-origin",
        headers,
    })
}