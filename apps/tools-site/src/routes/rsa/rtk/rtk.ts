import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGenerateKey } from "../types";

export interface IRsaSliceState extends IGenerateKey {
	privateKey: string;
	publicKey: string;
}

const initialState: IRsaSliceState = {
	privateKey: "",
	publicKey: "",
};

export const rsaSlice = createSlice({
	name: "rsa-slice",
	initialState: initialState,
	reducers: {
		setPrivateKey: (state, action: PayloadAction<string>) => {
			state.privateKey = action.payload;
		},
		setPublicKey: (state, action: PayloadAction<string>) => {
			state.publicKey = action.payload;
		},
		setKeys: (state, action: PayloadAction<IGenerateKey>) => {
			state.privateKey = action.payload.privateKey;
			state.publicKey = action.payload.publicKey;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setPrivateKey, setPublicKey, setKeys } = rsaSlice.actions;

export default rsaSlice.reducer;
