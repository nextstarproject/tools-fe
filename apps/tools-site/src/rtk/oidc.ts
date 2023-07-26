import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "oidc-client";
import { AsyncStatus } from "@project-self/types/async-status";

export type ProfileExtend = Profile & {
	userrole?: string;
	emailaddr?: string;
	photo?: string;
};

export type IAuthState = {
	loginStatus: AsyncStatus;
	logoutStatus: AsyncStatus;
};

export const oidcExtendSlice = createSlice({
	name: "oidcExtend",
	initialState: {
		logoutStatus: AsyncStatus.None,
		loginStatus: AsyncStatus.None,
	},
	reducers: {
		changeLogoutStatus: (state, action: PayloadAction<AsyncStatus>) => {
			state.logoutStatus = action.payload;
		},
		changeLoginStatus: (state, action: PayloadAction<AsyncStatus>) => {
			state.loginStatus = action.payload;
		},
	},
});

export const { changeLogoutStatus, changeLoginStatus } = oidcExtendSlice.actions;

export default oidcExtendSlice.reducer;
