import { githubServiceApi } from "@project-self/utils/service-api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type ReleasesLatest = {
	url: string;
	html_url: string;
	id: number;
	author: {
		login: string;
		id: number;
		avatar_url: string;
	};
	node_id: string;
	tag_name: string;
	name: string;
	draft: boolean;
	prerelease: boolean;
	created_at: string;
	published_at: string;
	discussion_url?: string;
};

export const getReleasesLatest = createAsyncThunk<Nullable<ReleasesLatest>>(
	"releases/latest",
	async () => {
		try {
			const result = await githubServiceApi<ReleasesLatest>(
				"/repos/nextstarproject/tools-fe/releases/latest",
				{
					method: "get",
				}
			);
			if (result.status == 200) {
				return result.data;
			}
			return null;
		} catch (e) {
			return null;
		}
	}
);
