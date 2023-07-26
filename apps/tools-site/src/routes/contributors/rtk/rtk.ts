import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ContributorItem, getContributorList } from "./service";

export interface IContributorsSliceState {
	userList: ContributorItem[];
}

const testState: IContributorsSliceState = {
	userList: [
		{
			login: "AlbertXiaoPeng",
			id: 44151574,
			html_url: "https://github.com/AlbertXiaoPeng",
			avatar_url: "https://avatars.githubusercontent.com/u/44151574?v=4",
			contributions: 49,
		},
		{
			login: "SpiritLing",
			id: 26963582,
			html_url: "https://github.com/SpiritLing",
			avatar_url: "https://avatars.githubusercontent.com/u/26963582?v=4",
			contributions: 21,
		},
	],
};
const initialState: IContributorsSliceState = {
	userList: [],
};

export const contributorsSlice = createSlice({
	name: "contributors-slice",
	// 只有经过本地开发验证过后才可以添加这个测试数据，为了防止多次请求外部api
	initialState: import.meta.env.DEV ? testState : initialState,
	reducers: {
		setUsers: (state, action: PayloadAction<ContributorItem[]>) => {
			state.userList = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getContributorList.fulfilled, (state, action) => {
			state.userList = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const { setUsers } = contributorsSlice.actions;

export default contributorsSlice.reducer;
