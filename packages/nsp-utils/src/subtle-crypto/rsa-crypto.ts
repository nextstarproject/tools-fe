import {
	base64ToByte,
	byteToBase64,
	byteToStr,
	EncryptDecryptUsages,
	HashAlgorithm,
	SignVerifyUsages,
	strToByte,
	WrapUnwrapKeyUsages,
} from "./normal";

export type RsaPssTypes = "RSA-PSS";
export type RsaPkcs1Type = "RSASSA-PKCS1-v1_5";

export type RsaEncryptDecryptTypes = "RSA-OAEP";
export type RsaSignVerifyTypes = RsaPkcs1Type | RsaPssTypes;
export type RsaWrapKeyUnwrapKeyTypes = "RSA-OAEP";

export type RsaKeyTypes = RsaEncryptDecryptTypes | RsaSignVerifyTypes | RsaWrapKeyUnwrapKeyTypes;

export type RsaPssParameter<T extends RsaSignVerifyTypes> = T extends RsaPssTypes ? number : never;

export type RsaKeyUsages<T extends RsaKeyTypes> = T extends
	| RsaEncryptDecryptTypes
	| RsaWrapKeyUnwrapKeyTypes
	? EncryptDecryptUsages | WrapUnwrapKeyUsages
	: SignVerifyUsages;
/**
 *
 * @param name 为了安全请使用：RSA-OAEP
 * @param modulusLength 1024 2048 4096 越高越安全
 * @param hash
 * @param extractable 是否允许导出key
 * @param keyUsages 使用范围
 * @returns
 */
export async function generateKey<T extends RsaKeyTypes>(
	name: T,
	keyUsages: ReadonlyArray<RsaKeyUsages<T>>,
	modulusLength: number = 2048,
	hash: HashAlgorithm = "SHA-256",
	extractable: boolean = true
): Promise<CryptoKeyPair> {
	const result = await window.crypto.subtle.generateKey(
		{
			name: name,
			modulusLength: modulusLength,
			publicExponent: new Uint8Array([1, 0, 1]),
			hash: hash,
		} as RsaHashedKeyGenParams,
		extractable,
		keyUsages
	);
	return result;
}

export async function exportPrivateKey(key: CryptoKey) {
	const exported = await window.crypto.subtle.exportKey("pkcs8", key);
	const exportedAsBase64 = byteToBase64(exported);
	const pemExported = `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`;
	return pemExported;
}

export async function exportPublicKey(key: CryptoKey) {
	const exported = await window.crypto.subtle.exportKey("spki", key);
	const exportedAsBase64 = byteToBase64(exported);
	const pemExported = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
	return pemExported;
}

export async function exportJwtPrivateKey(key: CryptoKey) {
	const exported = await window.crypto.subtle.exportKey("jwk", key);
	return exported;
}

export async function importPrivateKey<T extends RsaKeyTypes>(
	pem: string,
	name: T,
	keyUsages: ReadonlyArray<RsaKeyUsages<T>>,
	modulusLength: number = 2048,
	hash: HashAlgorithm = "SHA-256",
	extractable: boolean = true
) {
	// fetch the part of the PEM string between header and footer
	const pemHeader = "-----BEGIN PRIVATE KEY-----";
	const pemFooter = "-----END PRIVATE KEY-----";
	const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
	// base64 decode the string to get the binary data
	const binaryDerString = window.atob(pemContents);
	// convert from a binary string to an ArrayBuffer
	const binaryDer = strToByte(binaryDerString);

	return window.crypto.subtle.importKey(
		"pkcs8",
		binaryDer,
		{
			name: name,
			modulusLength: modulusLength,
			publicExponent: new Uint8Array([1, 0, 1]),
			hash: hash,
		} as RsaHashedImportParams,
		extractable,
		keyUsages
	);
}

export async function importPublicKey<T extends RsaKeyTypes>(
	pem: string,
	name: T,
	keyUsages: ReadonlyArray<RsaKeyUsages<T>>,
	modulusLength: number = 2048,
	hash: HashAlgorithm = "SHA-256",
	extractable: boolean = true
) {
	// 获取 PEM 字符串在头部和尾部之间的部分
	const pemHeader = "-----BEGIN PUBLIC KEY-----";
	const pemFooter = "-----END PUBLIC KEY-----";
	const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
	// 将字符串通过 base64 解码为二进制数据
	const binaryDerString = window.atob(pemContents);
	// 将二进制字符串转换为 ArrayBuffer
	const binaryDer = strToByte(binaryDerString);

	return window.crypto.subtle.importKey(
		"spki",
		binaryDer,
		{
			name: name,
			modulusLength: modulusLength,
			publicExponent: new Uint8Array([1, 0, 1]),
			hash: hash,
		} as RsaHashedImportParams,
		extractable,
		keyUsages
	);
}

export async function importJwtPrivateKey<T extends RsaKeyTypes>(
	jwk: JsonWebKey,
	name: T,
	keyUsages: ReadonlyArray<RsaKeyUsages<T>>,
	modulusLength: number = 2048,
	hash: HashAlgorithm = "SHA-256",
	extractable: boolean = true
): Promise<CryptoKey> {
	return window.crypto.subtle.importKey(
		"jwk",
		jwk,
		{
			name: name,
			modulusLength: modulusLength,
			publicExponent: new Uint8Array([1, 0, 1]),
			hash: hash,
		} as RsaHashedImportParams,
		extractable,
		keyUsages
	);
}

/**
 *
 * @description 公钥加密，只适合 RSA-OAEP
 * @param message
 * @param publicKey 公钥Key
 * @returns base64值
 */
export async function encrypt(message: string, publicKey: CryptoKey): Promise<string> {
	const encoded = strToByte(message);
	const cipherText = await window.crypto.subtle.encrypt(
		{
			name: "RSA-OAEP",
		},
		publicKey,
		encoded
	);
	return byteToBase64(cipherText);
}

/**
 * @description 私钥解密，只适合使用 RSA-OAEP
 * @param message
 * @param privateKey 私钥Key
 * @returns
 */
export async function decrypt(cipherText: string, privateKey: CryptoKey): Promise<string> {
	const decrypted = await window.crypto.subtle.decrypt(
		{
			name: "RSA-OAEP",
		},
		privateKey,
		base64ToByte(cipherText)
	);
	return byteToStr(decrypted);
}

/**
 *
 * @description 私钥签名，只适合 RSA-PSS 和 RSASSA-PKCS1-v1_5
 * @param message
 * @param name
 * @param privateKey
 * @param length
 * @returns base64 编码后的结果
 */
export async function sign<T extends RsaSignVerifyTypes>(
	message: string,
	name: T,
	privateKey: CryptoKey,
	length: RsaPssParameter<T>
): Promise<string> {
	if (name == "RSA-PSS") {
		const encoded = strToByte(message);
		const signature = await window.crypto.subtle.sign(
			{
				name: name,
				saltLength: length,
			},
			privateKey,
			encoded
		);
		return byteToBase64(signature);
	}
	if (name == "RSASSA-PKCS1-v1_5") {
		const encoded = strToByte(message);
		const signature = await window.crypto.subtle.sign(name, privateKey, encoded);
		return byteToBase64(signature);
	}
	return "";
}

/**
 *
 * @description 公钥验证，只适合 RSA-PSS 和 RSASSA-PKCS1-v1_5
 * @param message
 * @param sign base64值
 * @param name
 * @param publicKey
 * @param length
 * @returns
 */
export async function verify<T extends RsaSignVerifyTypes>(
	message: string,
	sign: string,
	name: T,
	publicKey: CryptoKey,
	length: RsaPssParameter<T>
): Promise<boolean> {
	if (name == "RSA-PSS") {
		const encoded = strToByte(message);
		const signature = base64ToByte(sign);
		const result = await window.crypto.subtle.verify(
			{
				name: name,
				saltLength: length,
			},
			publicKey,
			signature,
			encoded
		);
		return result;
	}
	if (name == "RSASSA-PKCS1-v1_5") {
		const encoded = strToByte(message);
		const signature = base64ToByte(sign);
		const result = await window.crypto.subtle.verify(name, publicKey, signature, encoded);
		return result;
	}
	return false;
}
