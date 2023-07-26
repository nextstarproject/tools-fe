import { JSEncrypt } from "jsencrypt";
import { IGenerateKey } from "../types";

export const generatePublicKey = (key: JSEncrypt): Promise<string> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(key.getPublicKey());
		}, 200);
	});
};
export const generatePrivateKey = (key: JSEncrypt): Promise<string> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(key.getPrivateKey());
		}, 500);
	});
};

export const encryptByPublic = (key: string, text: string): Promise<string> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const encrypt = new JSEncrypt();
			encrypt.setPublicKey(key);
			const result = encrypt.encrypt(text);
			if (typeof result == "boolean" && !result) {
				resolve("");
			} else {
				resolve(result as string);
			}
		}, 200);
	});
};

export const decryptByPrivate = (key: string, text: string): Promise<string> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const decrypt = new JSEncrypt();
			decrypt.setPrivateKey(key);
			const result = decrypt.decrypt(text);
			if (typeof result == "boolean" && !result) {
				resolve("");
			} else {
				resolve(result as string);
			}
		}, 200);
	});
};

export const generateKeyAsync = async (bitLengthNumber: number): Promise<IGenerateKey> => {
	const key = new JSEncrypt({
		default_key_size: bitLengthNumber.toString(),
	});
	const _publicKey = await generatePublicKey(key);
	const _privateKey = await generatePrivateKey(key);
	return {
		publicKey: _publicKey,
		privateKey: _privateKey,
	};
};
