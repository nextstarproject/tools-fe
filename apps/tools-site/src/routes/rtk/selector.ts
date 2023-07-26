import { RootState } from "@project-self/store/store";
import { IPageSliceState } from "./rtk";
import { Selector } from "react-redux";

export const selectPageState: Selector<RootState, IPageSliceState> = (state) => state.page;
