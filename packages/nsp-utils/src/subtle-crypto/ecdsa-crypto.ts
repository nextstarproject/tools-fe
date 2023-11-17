import { HashAlgorithm, SignVerifyUsages, base64ToByte, byteToBase64, strToByte } from "./normal";

export type EcdsaNamedCurve = "P-256" | "P-384" | "P-521";

export async function generateEcdsaKey(
	namedCurve: EcdsaNamedCurve,
	keyUsages: ReadonlyArray<SignVerifyUsages>,
	extractable: boolean = true
): Promise<CryptoKeyPair> {
	const result = await window.crypto.subtle.generateKey(
		{
			name: "ECDSA",
			namedCurve: namedCurve,
		},
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

export async function importPrivateKey(
	pem: string,
	namedCurve: EcdsaNamedCurve,
	keyUsages: ReadonlyArray<SignVerifyUsages>,
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
			name: "ECDSA",
			namedCurve: namedCurve,
		},
		extractable,
		keyUsages
	);
}

export async function importPublicKey(
	pem: string,
	namedCurve: EcdsaNamedCurve,
	keyUsages: ReadonlyArray<SignVerifyUsages>,
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
			name: "ECDSA",
			namedCurve: namedCurve,
		},
		extractable,
		keyUsages
	);
}

export async function importJwtPrivateKey(
	jwk: JsonWebKey,
	namedCurve: EcdsaNamedCurve,
	keyUsages: ReadonlyArray<SignVerifyUsages>,
	extractable: boolean = true
): Promise<CryptoKey> {
	return window.crypto.subtle.importKey(
		"jwk",
		jwk,
		{
			name: "ECDSA",
			namedCurve: namedCurve,
		},
		extractable,
		keyUsages
	);
}

/**
 *
 * @description 私钥签名
 * @param message
 * @param name
 * @param privateKey
 * @param length
 * @returns base64 编码后的结果
 */
export async function signEcdsa(
	message: string,
	privateKey: CryptoKey,
	hash: HashAlgorithm = "SHA-256"
): Promise<string> {
	const encoded = strToByte(message);
	const signature = await window.crypto.subtle.sign(
		{
			name: "ECDSA",
			hash: {
				name: hash,
			},
		},
		privateKey,
		encoded
	);
	return byteToBase64(signature);
}

/**
 *
 * @description 公钥验证
 * @param message
 * @param sign base64值
 * @param name
 * @param publicKey
 * @param length
 * @returns
 */
export async function verifyEcdsa(
	message: string,
	sign: string,
	publicKey: CryptoKey,
	hash: HashAlgorithm = "SHA-256"
): Promise<boolean> {
	const encoded = strToByte(message);
	const signature = base64ToByte(sign);
	const result = await window.crypto.subtle.verify(
		{
			name: "ECDSA",
			hash: {
				name: hash,
			},
		},
		publicKey,
		signature,
		encoded
	);
	return result;
}
