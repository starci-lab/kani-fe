export const publicEnv = () => {
    return {
        apiBaseUrl: {
            http: process.env.NEXT_PUBLIC_API_HTTP_BASE_URL,
            socketIo: process.env.NEXT_PUBLIC_API_WEBSOCKET_BASE_URL,
            graphql: process.env.NEXT_PUBLIC_API_GRAPHQL_BASE_URL,
        },
        graphql: {
            maxRetry: Number(process.env.NEXT_PUBLIC_GRAPHQL_MAX_RETRY || 3),
            maxRetryDelay: Number(process.env.NEXT_PUBLIC_GRAPHQL_MAX_RETRY_DELAY || 1000),
            initialRetryDelay: Number(process.env.NEXT_PUBLIC_GRAPHQL_INITIAL_RETRY_DELAY || 300),
            timeout: Number(process.env.NEXT_PUBLIC_GRAPHQL_TIMEOUT || 300000),
        }
    }
}