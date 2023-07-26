import { RootState } from "@project-self/store/store";
import { IContributorsSliceState } from "./rtk";
import { Selector } from "react-redux";

export const selectContributorsState: Selector<RootState, IContributorsSliceState> = (state) =>
	state.page.contributors;
