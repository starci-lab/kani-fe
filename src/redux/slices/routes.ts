import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum SidebarTab {
    Bots = "bots",
    Portfolio = "portfolio",
}

export interface RoutesSlice {
    sidebarTab: SidebarTab
}

const initialState: RoutesSlice = {
    sidebarTab: SidebarTab.Bots,
}

export const routesSlice = createSlice({
    name: "routes",
    initialState,
    reducers: {
        setSidebarTab: (state, action: PayloadAction<SidebarTab>) => {
            state.sidebarTab = action.payload
        },
    },
})

export const routesReducer = routesSlice.reducer
export const { setSidebarTab } = routesSlice.actions