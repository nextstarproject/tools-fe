import { FormatType, OneWayEncryptionType } from "../types";
import CryptoJS from "crypto-js";

export const CryptoOneWayEncryption = (
	type: OneWayEncryptionType,
	codeType: FormatType,
	outCodeType: FormatType,
	text: string
): string => {
	switch (type) {
		case OneWayEncryptionType.MD5:
			return CryptoJS.MD5(
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(text) : text
			).toString(outCodeType == FormatType.Hex ? CryptoJS.enc.Hex : CryptoJS.enc.Base64);
		case OneWayEncryptionType.SHA1:
			return CryptoJS.SHA1(
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(text) : text
			).toString(outCodeType == FormatType.Hex ? CryptoJS.enc.Hex : CryptoJS.enc.Base64);
		case OneWayEncryptionType.SHA224:
			return CryptoJS.SHA224(
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(text) : text
			).toString(outCodeType == FormatType.Hex ? CryptoJS.enc.Hex : CryptoJS.enc.Base64);
		case OneWayEncryptionType.SHA256:
			return CryptoJS.SHA256(
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(text) : text
			).toString(outCodeType == FormatType.Hex ? CryptoJS.enc.Hex : CryptoJS.enc.Base64);
		case OneWayEncryptionType.SHA384:
			return CryptoJS.SHA384(
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(text) : text
			).toString(outCodeType == FormatType.Hex ? CryptoJS.enc.Hex : CryptoJS.enc.Base64);
		case OneWayEncryptionType.SHA512:
			return CryptoJS.SHA512(
				codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(text) : text
			).toString(outCodeType == FormatType.Hex ? CryptoJS.enc.Hex : CryptoJS.enc.Base64);
		case OneWayEncryptionType.SHA3:
			// 单独处理，SHA3 包含： SHA3-224等操作
			return "";
		default:
			return "";
	}
};

export const SingleCryptoOneWayEncryption = (text: string): string => {
	return CryptoOneWayEncryption(
		OneWayEncryptionType.SHA256,
		FormatType.Text,
		FormatType.Base64,
		text
	);
};
