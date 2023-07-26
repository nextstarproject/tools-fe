import { AccessTokenKey } from "@project-self/assets/consts/global-consts";
import { nsLocalStorage } from "@project-self/utils/storage";

export const saveToken = (accessToken: string) => {
	if (!accessToken) {
		return;
	}
	nsLocalStorage.set(AccessTokenKey, accessToken);
};

export const removeToken = () => {
	nsLocalStorage.remove(AccessTokenKey);
};

export const getToken = (): string | undefined => {
	return nsLocalStorage.get(AccessTokenKey);
};
