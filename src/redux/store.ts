import { configureStore } from "@reduxjs/toolkit"
import { chainReducer, apiReducer, sessionReducer } from "./slices"

export const store = configureStore({
    reducer: {
        chain: chainReducer,
        api: apiReducer,
        session: sessionReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
