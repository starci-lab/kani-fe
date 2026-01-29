export interface GraphQLResponse<TData = undefined> {
    success: boolean;
    message: string;
    error?: string;
    data?: TData;
}

export enum GraphQLHeadersKey {
    TOTP = "X-TOTP",
    EmailOTP = "X-Email-OTP",
}

export type GraphQLHeaders = Partial<Record<GraphQLHeadersKey, string>>

export interface MutationParams<TMutation, TRequest = undefined> {
    mutation?: TMutation
    request?: TRequest
    headers?: GraphQLHeaders
    token?: string
}

export interface QueryParams<TQuery, TRequest = undefined> {
    query?: TQuery
    request?: TRequest
    headers?: GraphQLHeaders
    token?: string
}

export interface QueryVariables<TRequest> {
    request: TRequest
}

export interface MutationVariables<TRequest> {
    request: TRequest
}

export interface QueryVariables<TRequest> {
    request: TRequest
}

