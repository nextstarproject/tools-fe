import { githubServiceApi } from "@project-self/utils/service-api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type ContributorItem = {
	login: string;
	id: number;
	avatar_url: string;
	html_url: string;
	contributions: number;
};

/**
 * @link https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk
 */
export const getContributorList = createAsyncThunk<ContributorItem[]>(
	"contributors/getList",
	async () => {
		try {
			const result = await githubServiceApi<ContributorItem[]>(
				"/repos/nextstarproject/tools-fe/contributors",
				{
					method: "get",
				}
			);
			if (result.status == 200) {
				return result.data;
			}
			return [];
		} catch (e) {
			return [];
		}
	}
);
