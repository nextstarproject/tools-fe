import { serviceApiNormalCreate } from "nsp-utils";

const githubServiceApi = serviceApiNormalCreate({
	baseURL: "https://api.github.com",
});

export { githubServiceApi };
