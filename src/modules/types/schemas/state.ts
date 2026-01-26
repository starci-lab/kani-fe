import { StateId } from "../enums"
import { AbstractSchema } from "./abstract"

export interface StateSchema extends AbstractSchema {
    displayId: StateId
    value: Record<string, unknown>
}

export interface RpcEjection {
    rpcId: string
    ejectedAt: Date
}

export interface RpcEjectionState {
    data: Array<RpcEjection>
}

export interface StateRecord<T> {
    value: T
}
