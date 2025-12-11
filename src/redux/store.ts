import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { 
    chainReducer, 
    apiReducer, 
    sessionReducer, 
    staticReducer, 
    socketReducer, 
    modalsReducer,
    rpcReducer,
    routesReducer,
    botsReducer,
} from "./slices"

export const store = configureStore({
    reducer: {
        chain: chainReducer,
        api: apiReducer,
        session: sessionReducer,
        static: staticReducer,
        socket: socketReducer,
        rpc: rpcReducer,
        modals: modalsReducer,
        routes: routesReducer,
        pages: combineReducers({
            bots: botsReducer,
        }),
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
