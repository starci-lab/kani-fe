export interface GraphQLResponse<TData = undefined> {
    success: boolean;
    message: string;
    error?: string;
    data?: TData;
}

export enum MutationHeadersKey {
    TOTP = "X-TOTP",
}

export type MutationHeaders = Record<MutationHeadersKey, string>

export interface MutationParams<TMutation, TRequest = undefined> {
    mutation?: TMutation
    request?: TRequest
    headers?: MutationHeaders
}

export interface MutationVariables<TRequest> {
    request: TRequest
}

export interface QueryParams<TQuery, TRequest = undefined> {
    query?: TQuery
    request?: TRequest
    headers?: Record<string, string>
}

export interface QueryVariables<TRequest> {
    request: TRequest
}