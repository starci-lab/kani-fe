import { TokenId } from "@/modules/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface DepositModalSlice {
    tokenId?: TokenId
}

const initialState: DepositModalSlice = {
    tokenId: TokenId.SolNative,
}

export const depositModalSlice = createSlice({
    name: "depositModal",
    initialState,
    reducers: {
        setDepositModalTokenId: (state, action: PayloadAction<TokenId | undefined>) => {
            state.tokenId = action.payload
        },
    },
})

export const depositModalReducer = depositModalSlice.reducer
export const { setDepositModalTokenId } = depositModalSlice.actions