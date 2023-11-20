import { HashAlgorithm, SignVerifyUsages, base64ToByte, byteToBase64, strToByte } from "./normal";

export async function generateKey(
	hash: HashAlgorithm = "SHA-256",
	keyUsages: ReadonlyArray<SignVerifyUsages> = ["sign", "verify"],
	extractable: boolean = true
): Promise<CryptoKey> {
	const result = await window.crypto.subtle.generateKey(
		{
			name: "HMAC",
			hash: {
				name: hash,
			},
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

export async function importRawKey(
	pem: string,
	hash: HashAlgorithm = "SHA-256",
	keyUsages: ReadonlyArray<SignVerifyUsages> = ["sign", "verify"],
	extractable: boolean = true
) {
	const binaryDer = base64ToByte(pem);
	return window.crypto.subtle.importKey(
		"raw",
		binaryDer,
		{
			name: "HMAC",
			hash: {
				name: hash,
			},
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
export async function sign(
	message: string,
	privateKey: CryptoKey,
	hash: HashAlgorithm = "SHA-256"
): Promise<string> {
	const encoded = strToByte(message);
	const signature = await window.crypto.subtle.sign(
		{
			name: "HMAC",
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
export async function verify(
	message: string,
	sign: string,
	publicKey: CryptoKey,
	hash: HashAlgorithm = "SHA-256"
): Promise<boolean> {
	const encoded = strToByte(message);
	const signature = base64ToByte(sign);
	const result = await window.crypto.subtle.verify(
		{
			name: "HMAC",
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
