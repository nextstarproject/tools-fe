import { byteToBase64, byteToHex } from "./normal";

export type DigestAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

/**
 * @description 生成给定数据的摘要
 * @param message 文本
 * @param algorithm 支持的算法
 * @link https://developer.mozilla.org/zh-CN/docs/Web/API/SubtleCrypto/digest
 * @returns 返回Hex
 * @example
 *
 * ```
 * const text =
 * "An obscure body in the S-K System, your majesty. The inhabitants refer to it as the planet Earth.";
 *
 * digestMessage(text, "SHA-256").then((digestHex) => console.log(digestHex));
 * ```
 */
export async function digestMessageHex(
	message: string,
	algorithm: DigestAlgorithm
): Promise<string> {
	const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
	const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8); // hash the message
	const hex = byteToHex(hashBuffer);
	return hex;
}

/**
 * @description 生成给定数据的摘要
 * @param message 文本
 * @param algorithm 支持的算法
 * @link https://developer.mozilla.org/zh-CN/docs/Web/API/SubtleCrypto/digest
 * @returns 返回Base64
 * @example
 *
 * ```
 * const text =
 * "An obscure body in the S-K System, your majesty. The inhabitants refer to it as the planet Earth.";
 *
 * digestMessage(text, "SHA-256").then((digestHex) => console.log(digestHex));
 * ```
 */
export async function digestMessageBase64(
	message: string,
	algorithm: DigestAlgorithm
): Promise<string> {
	const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
	const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8); // hash the message
	const base64 = byteToBase64(hashBuffer);
	return base64;
}
