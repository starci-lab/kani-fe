import { combineReducers } from "@reduxjs/toolkit"
import { exportPrivateKeyReducer } from "./export-private-key"
import { depositModalReducer } from "./deposit"
export * from "./export-private-key"
export * from "./sign-in"
export * from "./enable-mfa"
export * from "./verify"
export * from "./deposit"

export const modalsReducer = combineReducers({
    exportPrivateKey: exportPrivateKeyReducer,
    deposit: depositModalReducer,
})

