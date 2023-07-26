import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ThemeColor } from "@project-self/assets/consts/theme-color";
import { Languages, getI18n } from "nsp-i18n";
import { nsLocalStorage } from "@project-self/utils/storage";

export interface IGlobalSliceState {
	theme: {
		primaryColor: ThemeColor;
		isDark: boolean;
	};
	language: Languages;
	loading: boolean;
	beforeUnload: {
		status: boolean;
		message: string;
	};
}

const initialState: IGlobalSliceState = {
	theme: {
		primaryColor: ThemeColor.Primary,
		isDark: false,
	},
	language: window._LANGUAGE_,
	loading: true,
	beforeUnload: {
		status: false,
		message: "",
	},
};

export const globalSlice = createSlice({
	name: "global-slice",
	initialState,
	reducers: {
		setThemeColor: (state, action: PayloadAction<ThemeColor>) => {
			state.theme.primaryColor = action.payload;
		},
		setThemeDark: (state, action: PayloadAction<boolean>) => {
			state.theme.isDark = action.payload;
		},
		setLanguage: (state, action: PayloadAction<Languages>) => {
			nsLocalStorage.set("language", action.payload);
			if (import.meta.env.NSP_LANGUAGE == "true") {
				getI18n().changeLanguage(action.payload);
			}
			state.language = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setBeforeUnload: (
			state,
			action: PayloadAction<{
				status: boolean;
				message: string;
			}>
		) => {
			state.beforeUnload = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setThemeColor, setThemeDark, setLanguage, setLoading, setBeforeUnload } =
	globalSlice.actions;

export default globalSlice.reducer;
