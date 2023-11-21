import {
	EncryptDecryptUsages,
	WrapUnwrapKeyUsages,
	base64ToByte,
	byteToBase64,
	byteToStr,
	strToByte,
} from "./normal";

export type AesKeyBitLength = 128 | 192 | 256;
export type AesCtrType = "AES-CTR";
export type AesIvType = "AES-CBC" | "AES-GCM";
export type AesEncryptDecryptTypes = AesCtrType | AesIvType;
export type AesWrapKeyUnwrapKeyTypes = "AES-KW";
export type AesKeyTypes = AesEncryptDecryptTypes | AesWrapKeyUnwrapKeyTypes;

export type AesKeyUsages<T extends AesKeyTypes> = T extends AesEncryptDecryptTypes
	? EncryptDecryptUsages
	: WrapUnwrapKeyUsages;

/**
 *
 * @param name
 * @param keyUsages
 * @param modulusLength
 * @param extractable
 * @returns
 */
export async function generateKey<T extends AesKeyTypes>(
	name: T,
	keyUsages: ReadonlyArray<AesKeyUsages<T>>,
	modulusLength: AesKeyBitLength = 256,
	extractable: boolean = true
): Promise<CryptoKey> {
	const result = await window.crypto.subtle.generateKey(
		{
			name: name,
			length: modulusLength,
		},
		extractable,
		keyUsages
	);
	return result;
}

export async function exportRawKey(key: CryptoKey) {
	const exported = await window.crypto.subtle.exportKey("raw", key);
	const exportedAsBase64 = byteToBase64(exported);
	return exportedAsBase64;
}

export async function importRawKey<T extends AesKeyTypes>(
	pem: string,
	name: T,
	keyUsages: ReadonlyArray<AesKeyUsages<T>>,
	length: AesKeyBitLength = 256,
	extractable: boolean = true
) {
	const binaryDer = base64ToByte(pem);
	return window.crypto.subtle.importKey(
		"raw",
		binaryDer,
		{
			name: name,
			length: length,
		},
		extractable,
		keyUsages
	);
}

/**
 *
 * @param message
 * @param name
 * @param key
 * @param parameter CTR 时 parameter 和 length 长度必须一致 n <= 2^m,
 * @param length 64
 * @returns
 * @example
 *
 * ```
 * counter or iv = window.crypto.getRandomValues(new Uint8Array(16));
 *
 * ```
 */
export async function encrypt(
	message: string,
	name: AesEncryptDecryptTypes,
	key: CryptoKey,
	parameter: Uint8Array,
	length: number = 64
): Promise<string> {
	if (name == "AES-CTR") {
		const encoded = strToByte(message);
		const cipherByte = await window.crypto.subtle.encrypt(
			{
				name: name,
				counter: parameter,
				length: length,
			},
			key,
			encoded
		);

		return byteToBase64(cipherByte);
	} else {
		const encoded = strToByte(message);
		const cipherByte = await window.crypto.subtle.encrypt(
			{
				name: name,
				iv: parameter,
			},
			key,
			encoded
		);

		return byteToBase64(cipherByte);
	}
}

/**
 *
 * @param cipherText
 * @param name
 * @param key
 * @param parameter 和加密一样的参数即可
 * @param length
 * @returns
 */
export async function decrypt(
	cipherText: string,
	name: AesEncryptDecryptTypes,
	key: CryptoKey,
	parameter: Uint8Array,
	length: number = 64
): Promise<string> {
	if (name == "AES-CTR") {
		const encoded = base64ToByte(cipherText);
		const decrypted = await window.crypto.subtle.decrypt(
			{
				name: name,
				counter: parameter,
				length: length,
			},
			key,
			encoded
		);

		return byteToStr(decrypted);
	} else {
		const encoded = base64ToByte(cipherText);
		const decrypted = await window.crypto.subtle.decrypt(
			{
				name: name,
				iv: parameter,
			},
			key,
			encoded
		);

		return byteToStr(decrypted);
	}
}
