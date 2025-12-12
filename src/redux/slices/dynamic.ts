import { DynamicLiquidityPoolInfo } from "@/modules/api"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface DynamicSlice {
    dynamicLiquidityPoolInfos: Array<DynamicLiquidityPoolInfo>
}

const initialState: DynamicSlice = {
    dynamicLiquidityPoolInfos: [],
}

export const dynamicSlice = createSlice({
    name: "static",
    initialState,
    reducers: {
        setDynamicLiquidityPoolInfos: (state, action: PayloadAction<Array<DynamicLiquidityPoolInfo>>) => {
            state.dynamicLiquidityPoolInfos = action.payload
        },
    },
})

export const dynamicReducer = dynamicSlice.reducer
export const { setDynamicLiquidityPoolInfos } = dynamicSlice.actions