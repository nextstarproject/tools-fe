import {
	base64ToByte,
	byteToBase64,
	byteToHex,
	byteToStr,
	hashAlgorithm,
	strToByte,
} from "./normal";

export type GenerateKeyAlgorithm =
	| RsaHashedKeyGenParams
	| EcKeyGenParams
	| HmacKeyGenParams
	| AesKeyGenParams;

export type RsaHashedKeyGenName = "RSASSA-PKCS1-v1_5" | "RSA-PSS" | "RSA-OAEP";

// encrypt RSA-OAEP AES-CTR AES-CBC AES-GCM
// decrypt RSA-OAEP AES-CTR AES-CBC AES-GCM
// sign RSASSA-PKCS1-v1_5 RSA-PSS ECDSA HMAC
// verify RSASSA-PKCS1-v1_5 RSA-PSS ECDSA HMAC
// deriveKey ECDH HKDF PBKDF2
// deriveBits ECDH HKDF PBKDF2
// wrapKey RSA-OAEP AES-CTR AES-CBC AES-GCM AES-KW
// unwrapKey RSA-OAEP AES-CTR AES-CBC AES-GCM AES-KW

/**
 *
 * @param name 为了安全请使用：RSA-OAEP
 * @param modulusLength 1024 2048 4096 越高越安全
 * @param hash
 * @param extractable 是否允许导出key
 * @param keyUsages 使用范围
 * @returns
 * @example
 * encrypt RSA-OAEP AES-CTR AES-CBC AES-GCM
 * decrypt RSA-OAEP AES-CTR AES-CBC AES-GCM
 * sign RSASSA-PKCS1-v1_5 RSA-PSS ECDSA HMAC
 * verify RSASSA-PKCS1-v1_5 RSA-PSS ECDSA HMAC
 * deriveKey ECDH HKDF PBKDF2
 * deriveBits ECDH HKDF PBKDF2
 * wrapKey RSA-OAEP AES-CTR AES-CBC AES-GCM AES-KW
 * unwrapKey RSA-OAEP AES-CTR AES-CBC AES-GCM AES-KW
 */
export async function generateRsaKey(
	modulusLength: number = 2048,
	hash: hashAlgorithm = "SHA-256",
	name: RsaHashedKeyGenName = "RSA-OAEP",
	extractable: boolean = true,
	keyUsages: ReadonlyArray<KeyUsage> = ["decrypt", "encrypt"]
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

export async function exportJwtKey(key: CryptoKey) {
	const exported = await window.crypto.subtle.exportKey("jwk", key);
	return exported;
}

/**
 *
 * @param message
 * @param key 公钥Key
 * @returns
 */
export async function encryptRSAOAEP(message: string, key: CryptoKey): Promise<string> {
	const encoded = strToByte(message);
	const cipherText = await window.crypto.subtle.encrypt(
		{
			name: "RSA-OAEP",
		},
		key,
		encoded
	);
	return byteToBase64(cipherText);
}

/**
 *
 * @param message
 * @param key 私钥Key
 * @returns
 */
export async function decryptRSAOAEP(cipherText: string, key: CryptoKey): Promise<string> {
	const decrypted = await window.crypto.subtle.decrypt(
		{
			name: "RSA-OAEP",
		},
		key,
		base64ToByte(cipherText)
	);
	return byteToStr(decrypted);
}
