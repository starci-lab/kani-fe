import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { chainReducer } from "./slices"

export const store = configureStore({
    reducer: combineReducers([chainReducer]),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
