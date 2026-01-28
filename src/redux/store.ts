import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { 
    chainReducer, 
    apiReducer, 
    staticReducer, 
    socketReducer,
    routesReducer,
    signInModalReducer,
    exportPrivateKeyReducer,
    enableMFAModalReducer,
    botReducer,
    verifyModalReducer,
    depositModalReducer,
    sessionReducer,
    createBotReducer,
} from "./slices"

export const store = configureStore({
    reducer: {
        chain: chainReducer,
        api: apiReducer,
        static: staticReducer,
        socket: socketReducer,
        routes: routesReducer,
        bot: botReducer,
        session: sessionReducer,
        createBot: createBotReducer,
        modals: combineReducers({
            deposit: depositModalReducer,
            signIn: signInModalReducer,
            exportPrivateKey: exportPrivateKeyReducer,
            enableMFAModal: enableMFAModalReducer,
            verify: verifyModalReducer,
        }),
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
