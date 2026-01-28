export const publicEnv = () => {
    return {
        privy: {
            appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID || "",
            clientId: process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID || "",
        },
        api: {
            http: process.env.NEXT_PUBLIC_API_HTTP_BASE_URL || "http://localhost:3001/api",
            socketIo: process.env.NEXT_PUBLIC_API_WEBSOCKET_BASE_URL || "ws://localhost:3001",
            graphql: process.env.NEXT_PUBLIC_API_GRAPHQL_BASE_URL || "http://localhost:3001/graphql",
        },
        graphql: {
            maxRetry: Number(process.env.NEXT_PUBLIC_GRAPHQL_MAX_RETRY || 3),
            maxRetryDelay: Number(process.env.NEXT_PUBLIC_GRAPHQL_MAX_RETRY_DELAY || 1000),
            initialRetryDelay: Number(process.env.NEXT_PUBLIC_GRAPHQL_INITIAL_RETRY_DELAY || 300),
            timeout: Number(process.env.NEXT_PUBLIC_GRAPHQL_TIMEOUT || 300000),
        },
        computation: {
            amount: {
                fractionDigits: Number(process.env.NEXT_PUBLIC_COMPUTATION_AMOUNT_FRACTION_DIGITS || 10),
            },
            operation: {
                fractionDigits: Number(process.env.NEXT_PUBLIC_COMPUTATION_OPERATION_FRACTION_DIGITS || 10),
            },
            round: {
                fractionDigits: Number(process.env.NEXT_PUBLIC_COMPUTATION_ROUND_FRACTION_DIGITS || 5),
            },
            percentage: {
                fractionDigits: Number(process.env.NEXT_PUBLIC_COMPUTATION_PERCENTAGE_FRACTION_DIGITS || 5),
            },
        },
    }
}