import { ApolloClient, ApolloLink, InMemoryCache, DefaultOptions } from "@apollo/client"
import { SessionStorage, SessionStorageKey } from "@/modules/storages"
import {
    CombinedGraphQLErrors,
    CombinedProtocolErrors,
} from "@apollo/client/errors"
import { ErrorLink } from "@apollo/client/link/error"
import { createTimeoutLink } from "./timeout"
import { createRetryLink } from "./retry"
import { createHttpLink } from "./http"
import { defaultOptions } from "./options"

const sessionStorage = new SessionStorage()

// Modern auth link using ApolloLink (setContext is deprecated)
const createAccessTokenAuthLink = (token?: string) =>
    new ApolloLink((operation, forward) => {
        const accessToken = token || sessionStorage.getItem<string>(SessionStorageKey.AccessToken)
        // Add Authorization header if accessToken exists
        if (accessToken) {
            operation.setContext(({ headers = {} }) => ({
                headers: {
                    ...headers,
                    authorization: `Bearer ${accessToken}`,
                },
            }))
        }
        // Forward the operation down the link chain
        return forward(operation)
    })
    
const createErrorLink = () =>
    new ErrorLink(({ error }) => {
        // if graphql error, log it
        if (CombinedGraphQLErrors.is(error)) {
            for (const gqlErr of error.errors) {
                if (
                    gqlErr.message === "Unauthorized" 
                        || gqlErr.extensions?.code === "UNAUTHENTICATED"
                ) {
                    console.log("[GraphQL error]: Unauthorized")
                }
            }
            return
        }
        // if protocol error, log the error
        if (CombinedProtocolErrors.is(error)) {
            error.errors.forEach(({ message, extensions }) =>
                console.log(
                    `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
                        extensions
                    )}`
                )
            )
            return
        }
        // if network error, log the error
        console.error(`[Network error]: ${error.message}`)
    })

export interface CreateApolloClientOptions {
    /** Whether to use authentication */
    auth?: boolean
    /** Whether to use cache (defaultOptions with no-cache policy) */
    cache?: boolean
    /** Optional access token (e.g., from Privy). If not provided, will use token from session storage */
    token?: string
    /** Whether to include credentials (http-only cookies) */
    withCredentials?: boolean
    /** Optional custom headers */
    headers?: Record<string, string>
    /** Optional default options for queries/mutations */
    defaultOptions?: DefaultOptions
}

/**
 * Creates a single Apollo Client instance with configurable options.
 * Supports authentication, cache control, and credentials.
 * 
 * @param options - Options object or token string (for backward compatibility)
 */
export const createApolloClient = (
    options: CreateApolloClientOptions
) => {
    const {
        auth = true,
        cache = true,
        token,
        withCredentials = false,
        headers = {},
        defaultOptions: customDefaultOptions,
    } = options

    // Build link chain
    const links: Array<ApolloLink> = [
        createRetryLink(),
    ]

    // Add auth link if auth is enabled
    if (auth) {
        links.push(createAccessTokenAuthLink(token))
    }

    links.push(
        createErrorLink(),
        createTimeoutLink(),
        createHttpLink(withCredentials, headers)
    )

    // Determine default options
    const finalDefaultOptions = customDefaultOptions || (cache ? defaultOptions : undefined)

    return new ApolloClient({
        link: ApolloLink.from(links),
        cache: new InMemoryCache(),
        defaultOptions: finalDefaultOptions,
    })
}

/**
 * Helper function to create Apollo Client with token and headers.
 * Convenience wrapper for createApolloClient.
 */
export const createApolloClientAndHeaders = (
    token: string,
    headers: Record<string, string>
) => {
    return createApolloClient({
        token,
        headers,
        withCredentials: true,
        auth: true,
        cache: false,
    })
}

// Default client instances

/**
 * Client without authentication, without cache policy
 */
export const client = createApolloClient({
    auth: false,
    cache: false,
})

/**
 * No cache client without authentication, with no-cache policy
 */
export const noCacheClient = createApolloClient({
    auth: false,
    cache: false,
})

/**
 * No cache client with credentials, without authentication
 */
export const noCacheCredentialClient = createApolloClient({
    auth: false,
    cache: false,
    withCredentials: true,
})