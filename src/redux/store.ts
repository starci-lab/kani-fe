import { configureStore } from "@reduxjs/toolkit"
import { 
    chainReducer, 
    apiReducer, 
    sessionReducer, 
    pageReducer, 
    staticReducer, 
    socketReducer, 
    paramsReducer 
} from "./slices"

export const store = configureStore({
    reducer: {
        chain: chainReducer,
        api: apiReducer,
        session: sessionReducer,
        page: pageReducer,
        static: staticReducer,
        socket: socketReducer,
        params: paramsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
