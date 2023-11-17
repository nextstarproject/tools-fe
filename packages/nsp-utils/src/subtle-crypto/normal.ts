/**
 * @description ArrayBuffer to Base64
 * @param byte
 * @returns
 * @link https://stackoverflow.com/a/9458996/18639839
 * @example
 *
 * ```
 * byteToBase64(new Uint8Array([127,142,122]))
 * ```
 *
 * output
 *
 * => 'f456'
 */
export const byteToBase64 = (byte: ArrayBuffer): string => {
	let binary = "";
	const byteList = new Uint8Array(byte);
	const len = byteList.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(byteList[i]);
	}
	return window.btoa(binary);
};

/**
 * @description Base64 to ArrayBuffer
 * @param base64
 * @returns
 * @link https://stackoverflow.com/a/21797381/18639839
 * @example
 *
 * ```
 * base64ToByte("f456")
 * ```
 *
 * output
 *
 * {
 *   "0": 127,
 *   "1": 142,
 *   "2": 122
 * }
 *
 */
export const base64ToByte = (base64: string): ArrayBuffer => {
	const binaryString = atob(base64);
	const byteList = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		byteList[i] = binaryString.charCodeAt(i);
	}
	return byteList.buffer;
};

/**
 * @description String to ArrayBuffer
 * @param str
 * @returns
 * @link https://stackoverflow.com/a/37902334/18639839
 * @example
 *
 * ```
 * strToByte("SpiritLing")
 * ```
 * output
 * =>
 * {
 *   "0": 83,
 *   "1": 112,
 *   "2": 105,
 *   "3": 114,
 *   "4": 105,
 *   "5": 116,
 *   "6": 76,
 *   "7": 105,
 *   "8": 110,
 *   "9": 103
 * }
 *
 */
export const strToByte = (str: string): ArrayBuffer => {
	const enc = new TextEncoder();
	return enc.encode(str);
};

/**
 * @description ArrayBuffer to String
 * @param byte
 * @returns
 * @link https://stackoverflow.com/a/37902334/18639839
 * @example
 *
 * ```
 * byteToStr(new Uint8Array([83,112,105,114,105,116,76,105,110,103]))
 * ```
 * output
 * => "SpiritLing"
 *
 */
export const byteToStr = (byte: ArrayBuffer): string => {
	const bytes = new Uint8Array(byte);
	const enc = new TextDecoder("utf-8");
	return enc.decode(bytes);
};

/**
 * @description ArrayBuffer to Hex
 * @param byte
 * @returns
 * @link https://stackoverflow.com/a/40031979/18639839
 * @example
 *
 * ```
 * byteToBase64(new Uint8Array([ 4, 8, 12, 16 ]))
 * ```
 *
 * output
 *
 * => '04080c10'
 */
export const byteToHex = (byte: ArrayBuffer): string => {
	return [...new Uint8Array(byte)].map((x) => x.toString(16).padStart(2, "0")).join("");
};

/**
 * @description Hex to ArrayBuffer
 * @param hex
 * @returns
 * @link https://stackoverflow.com/a/43131635/18639839
 * @example
 *
 * ```
 * hexToByte('AA5504B10000B5')
 * ```
 *
 * output
 *
 * {
 * "0": 170,
 * "1": 85,
 * "2": 4,
 * "3": 177,
 * "4": 0,
 * "5": 0,
 * "6": 181
 * }
 */
export const hexToByte = (hex: string): ArrayBuffer => {
	const splitHex = hex.match(/[\da-f]{2}/gi) as string[];

	const typedArray = new Uint8Array(
		splitHex.map(function (h) {
			return parseInt(h, 16);
		})
	);

	return typedArray.buffer;
};

export type hashAlgorithm = "SHA-256" | "SHA-384" | "SHA-512";
