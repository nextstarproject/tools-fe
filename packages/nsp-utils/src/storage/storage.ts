import localStore from "store2";

export const localStorage = (namespace: string) => {
	return localStore.local.namespace(namespace);
};

export const sessionStorage = (namespace: string) => {
	return localStore.session.namespace(namespace);
};

export const getLocalStore = () => localStore;
