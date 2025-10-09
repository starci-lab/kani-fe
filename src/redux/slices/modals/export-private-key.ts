import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ExportPrivateKeySlice {
    privateKey: string
}

const initialState: ExportPrivateKeySlice = {
    privateKey: "",
}

    
export const exportPrivateKeySlice = createSlice({
    name: "exportPrivateKey",
    initialState,
    reducers: {
        setExportPrivateKey: (state, action: PayloadAction<string>) => {
            state.privateKey = action.payload
        },
    },
})

export const exportPrivateKeyReducer = exportPrivateKeySlice.reducer
export const { setExportPrivateKey } = exportPrivateKeySlice.actions