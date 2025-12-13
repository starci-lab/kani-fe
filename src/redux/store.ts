import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { 
    chainReducer, 
    apiReducer, 
    sessionReducer, 
    staticReducer, 
    socketReducer,
    rpcReducer,
    routesReducer,
    botsReducer,
    dynamicReducer,
    signInModalReducer,
    exportPrivateKeyReducer,
    enableMFAModalReducer,
} from "./slices"

export const store = configureStore({
    reducer: {
        chain: chainReducer,
        api: apiReducer,
        session: sessionReducer,
        static: staticReducer,
        dynamic: dynamicReducer,
        socket: socketReducer,
        rpc: rpcReducer,
        routes: routesReducer,
        pages: combineReducers({
            bots: botsReducer,
        }),
        modals: combineReducers({
            signIn: signInModalReducer,
            exportPrivateKey: exportPrivateKeyReducer,
            enableMFAModal: enableMFAModalReducer,
        }),
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
