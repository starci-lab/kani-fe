import { combineReducers } from "@reduxjs/toolkit"
import { exportPrivateKeyReducer } from "./export-private-key"
import { depositModalReducer } from "./deposit"
import { mfaVerificationModalReducer } from "./mfa-verification"
export * from "./export-private-key"
export * from "./sign-in"
export * from "./enable-mfa"
export * from "./mfa-verification"
export * from "./deposit"

export const modalsReducer = combineReducers({
    exportPrivateKey: exportPrivateKeyReducer,
    deposit: depositModalReducer,
    mfaVerification: mfaVerificationModalReducer,
})

