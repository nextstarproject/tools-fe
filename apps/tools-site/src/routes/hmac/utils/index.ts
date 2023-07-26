import { FormatType, HmacType } from "../types";
import CryptoJS from "crypto-js";

export const CryptoHmac = (
	type: HmacType,
	codeType: FormatType,
	outCodeType: FormatType,
	text: string,
	key: string
): string => {
	switch (type) {
		case HmacType.MD5:
			return CryptoJS.HmacMD5(
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(text) : text,
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(key) : key
			).toString(outCodeType == FormatType.Hex ? CryptoJS.enc.Hex : CryptoJS.enc.Base64);
		case HmacType.SHA1:
			return CryptoJS.HmacSHA1(
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(text) : text,
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(key) : key
			).toString(outCodeType == FormatType.Hex ? CryptoJS.enc.Hex : CryptoJS.enc.Base64);
		case HmacType.SHA224:
			return CryptoJS.HmacSHA224(
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(text) : text,
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(key) : key
			).toString(outCodeType == FormatType.Hex ? CryptoJS.enc.Hex : CryptoJS.enc.Base64);
		case HmacType.SHA256:
			return CryptoJS.HmacSHA256(
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(text) : text,
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(key) : key
			).toString(outCodeType == FormatType.Hex ? CryptoJS.enc.Hex : CryptoJS.enc.Base64);
		case HmacType.SHA384:
			return CryptoJS.HmacSHA384(
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(text) : text,
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(key) : key
			).toString(outCodeType == FormatType.Hex ? CryptoJS.enc.Hex : CryptoJS.enc.Base64);
		case HmacType.SHA512:
			return CryptoJS.HmacSHA512(
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(text) : text,
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(key) : key
			).toString(outCodeType == FormatType.Hex ? CryptoJS.enc.Hex : CryptoJS.enc.Base64);
		case HmacType.SHA3:
			return CryptoJS.HmacSHA3(
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(text) : text,
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(key) : key
			).toString(outCodeType == FormatType.Hex ? CryptoJS.enc.Hex : CryptoJS.enc.Base64);
		default:
			return "";
	}
};
