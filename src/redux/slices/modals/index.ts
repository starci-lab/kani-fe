import { combineReducers } from "@reduxjs/toolkit"
import { exportPrivateKeyReducer } from "./export-private-key"
export * from "./export-private-key"
export * from "./sign-in"
export * from "./enable-mfa"
export * from "./verify"

export const modalsReducer = combineReducers({
    exportPrivateKey: exportPrivateKeyReducer,
})

