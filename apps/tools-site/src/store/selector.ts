import { Selector } from "react-redux";
import { RootState } from "@project-self/store/store";
import { IGlobalSliceState } from "@project-self/rtk/global-slice";
import { IAuthState, ProfileExtend } from "@project-self/rtk/oidc";
import { AsyncStatus } from "@project-self/types/async-status";
import { UserState } from "redux-oidc";
import { ILayoutSliceState } from "@project-self/layouts/rtk/layout-slice";

export const selectGlobalState: Selector<RootState, IGlobalSliceState> = (state) => state.global;

/** select state from store.. */
export const selectOidc: Selector<RootState, UserState> = (state) => state.oidc;

export const selectAuthState: Selector<RootState, IAuthState> = (state) => ({
	loginStatus: state.oidc.loginStatus || AsyncStatus.None,
	logoutStatus: state.oidc.logoutStatus || AsyncStatus.None,
});

export const selectProfile: Selector<RootState, ProfileExtend | undefined> = (state) =>
	state.oidc.user?.profile as ProfileExtend;

export const selectLayoutState: Selector<RootState, ILayoutSliceState> = (state) => state.layout;
