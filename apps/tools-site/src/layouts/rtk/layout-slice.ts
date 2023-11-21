import { MenuItem, Menus } from "@project-self/assets/consts/menus";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReleasesLatest, getReleasesLatest } from "./service";

export interface ILastBreadcrumb {
	replace?: boolean;
	title?: string;
	url?: string;
}

export interface ILayoutSliceState {
	menus: Nullable<MenuItem[]>;
	/**
	 * @description 样式配置抽屉打开状态
	 */
	settingDrawer: boolean;
	applicationDrawer: boolean;
	breadcrumb?: ILastBreadcrumb;
	latest: Nullable<ReleasesLatest>;
}

const initialState: ILayoutSliceState = {
	menus: Menus,
	applicationDrawer: false,
	settingDrawer: false,
	breadcrumb: undefined,
	latest: null,
};

export const layoutSlice = createSlice({
	name: "layout-slice",
	initialState,
	reducers: {
		setMenus: (state, action: PayloadAction<Nullable<MenuItem[]>>) => {
			state.menus = action.payload;
		},
		setSettingDrawer: (state, action: PayloadAction<boolean>) => {
			if (import.meta.env.NSP_THEME_CONFIG == "true") {
				state.settingDrawer = action.payload;
			} else {
				state.settingDrawer = false;
			}
		},
		setApplicationDrawer: (state, action: PayloadAction<boolean>) => {
			state.applicationDrawer = action.payload;
		},
		setLastBreadcrumb: (state, action: PayloadAction<ILastBreadcrumb | undefined>) => {
			state.breadcrumb = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getReleasesLatest.fulfilled, (state, action) => {
			state.latest = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const { setMenus, setSettingDrawer, setLastBreadcrumb, setApplicationDrawer } =
	layoutSlice.actions;

export default layoutSlice.reducer;
