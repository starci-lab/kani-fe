import { combineReducers } from "@reduxjs/toolkit"
import { exportPrivateKeyReducer } from "./export-private-key"
export * from "./export-private-key"

export const modalsReducer = combineReducers({
    exportPrivateKey: exportPrivateKeyReducer,
})
