import { combineReducers } from "@reduxjs/toolkit";
import contributorsReducer, { IContributorsSliceState } from "../contributors/rtk/rtk";

export interface IPageSliceState {
	contributors: IContributorsSliceState;
}

export const PageReducers = combineReducers<IPageSliceState>({
	contributors: contributorsReducer,
});
