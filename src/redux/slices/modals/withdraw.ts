import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum WithdrawTab {
    SingleAsset = "singleAsset",
    Percentage = "percentage",
}

export interface WithdrawModalSlice {
    tab: WithdrawTab
    withdrawalExecuting: boolean
}

const initialState: WithdrawModalSlice = {
    tab: WithdrawTab.Percentage,
    withdrawalExecuting: false,
}

export const withdrawModalSlice = createSlice({
    name: "withdrawModal",
    initialState,
    reducers: {
        setWithdrawModalTab: (state, action: PayloadAction<WithdrawTab>) => {
            state.tab = action.payload
        },
        setWithdrawalExecuting: (state, action: PayloadAction<boolean>) => {
            state.withdrawalExecuting = action.payload
        },
    },
})

export const { setWithdrawModalTab, setWithdrawalExecuting } = withdrawModalSlice.actions

export const withdrawModalReducer = withdrawModalSlice.reducer