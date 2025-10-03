import { createSlice } from "@reduxjs/toolkit"


export interface ParamsSlice {
    // /dashboard/liquidity-provision/[id]
    dashboard: {
        liquidityProvision: {
            id?: string
        }
    }
}

const initialState: ParamsSlice = {
    dashboard: {
        liquidityProvision: {
        },
    },
}

export const paramsSlice = createSlice({
    name: "params",
    initialState,
    reducers: {
        setDashboardLiquidityProvisionId: (state, action) => {
            state.dashboard.liquidityProvision.id = action.payload
        },
    },
})

export const paramsReducer = paramsSlice.reducer
export const { setDashboardLiquidityProvisionId } = paramsSlice.actions