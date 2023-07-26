import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "@project-self/rtk/global-slice";
import logger from "redux-logger";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { reducer as oidcReducer } from "redux-oidc";
import { oidcExtendSlice } from "@project-self/rtk/oidc";
import { extendReducer } from "@project-self/redux/extend-reducer";
import { isDev } from "@project-self/utils/env-detect";
import layoutReducer from "@project-self/layouts/rtk/layout-slice";
import { PageReducers } from "@project-self/routes/rtk/rtk";

export const store = configureStore({
	reducer: {
		oidc: extendReducer(oidcReducer, oidcExtendSlice.reducer),
		global: globalReducer,
		layout: layoutReducer,
		page: PageReducers,
	},
	middleware: (getDefaultMiddleware) => {
		const defaultMiddleware = getDefaultMiddleware({
			//close redux-toolkits serialize warning to redux-oidc state.
			//due to https://github.com/maxmantz/redux-oidc/issues/169
			//due to https://github.com/maxmantz/redux-oidc/issues/169#issuecomment-693474948
			serializableCheck: {
				ignoredActions: ["redux-oidc/USER_FOUND"],
				ignoredPaths: ["oidc.user"],
			},
		});
		if (isDev) {
			return defaultMiddleware.concat(logger);
		}
		return defaultMiddleware;
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
