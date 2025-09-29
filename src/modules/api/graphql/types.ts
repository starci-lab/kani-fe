export interface GraphQLResponse<TData = undefined> {
    success: boolean;
    message: string;
    error?: string;
    data?: TData;
}

export interface MutationParams<TMutation, TRequest = undefined> {
    mutation?: TMutation
    request?: TRequest
}

export interface MutationVariables<TRequest> {
    request: TRequest
}

export interface QueryParams<TQuery, TRequest = undefined> {
    query?: TQuery
    request?: TRequest
}

export interface QueryVariables<TRequest> {
    request: TRequest
}