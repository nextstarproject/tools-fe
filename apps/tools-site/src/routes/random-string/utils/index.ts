import { ICryptoRandomStringOptions, RandomStringType } from "../types";

const array = new Uint32Array(10);
window.crypto.getRandomValues(array);

const GenerateForCryptoRandom = (length: number, characters: string[]): string => {
	const array = new Uint32Array(length);
	window.crypto.getRandomValues(array);
	const characterCount = characters.length;
	let string = "";
	for (const num of array) {
		string += characters[num % characterCount];
	}
	return string;
};

const GenerateForNumberRandom = (length: number, characters: string[]): string => {
	const characterCount = characters.length;
	let str = "";
	let stringLength = 0;
	while (stringLength < length) {
		const index = parseInt((Math.random() * characterCount).toString());
		if (index > characterCount) {
			continue;
		}
		str += characters[index];
		stringLength++;
	}
	return str;
};

export const CryptoRandomString = (options: ICryptoRandomStringOptions): string => {
	const { length, type, characters } = options;

	if (!(length >= 0 && isFinite(length))) {
		return "Expected a `length` to be a non-negative finite number";
	}

	if (type == RandomStringType.Custom && characters == undefined) {
		return "type is custom characters not undefined";
	}

	if (type === RandomStringType.UrlSafe) {
		return GenerateForCryptoRandom(length, [...CryptoRandomStringCharacters.urlSafeCharacters]);
	}

	if (type === RandomStringType.Numeric) {
		return GenerateForCryptoRandom(length, [...CryptoRandomStringCharacters.numericCharacters]);
	}

	if (type === RandomStringType.Distinguishable) {
		return GenerateForCryptoRandom(length, [
			...CryptoRandomStringCharacters.distinguishableCharacters,
		]);
	}

	if (type === RandomStringType.AsciiPrintable) {
		return GenerateForCryptoRandom(length, [
			...CryptoRandomStringCharacters.asciiPrintableCharacters,
		]);
	}

	if (type === RandomStringType.Alphanumeric) {
		return GenerateForCryptoRandom(length, [
			...CryptoRandomStringCharacters.alphanumericCharacters,
		]);
	}

	if (type === RandomStringType.Custom && characters != undefined) {
		return GenerateForCryptoRandom(length, [...characters]);
	}
	return "";
};

export const RandomString = (options: ICryptoRandomStringOptions): string => {
	const { length, type, characters } = options;

	if (!(length >= 0 && isFinite(length))) {
		return "Expected a `length` to be a non-negative finite number";
	}

	if (type == RandomStringType.Custom && characters == undefined) {
		return "type is custom characters not undefined";
	}

	if (type === RandomStringType.UrlSafe) {
		return GenerateForNumberRandom(length, [...CryptoRandomStringCharacters.urlSafeCharacters]);
	}

	if (type === RandomStringType.Numeric) {
		return GenerateForNumberRandom(length, [...CryptoRandomStringCharacters.numericCharacters]);
	}

	if (type === RandomStringType.Distinguishable) {
		return GenerateForNumberRandom(length, [
			...CryptoRandomStringCharacters.distinguishableCharacters,
		]);
	}

	if (type === RandomStringType.AsciiPrintable) {
		return GenerateForNumberRandom(length, [
			...CryptoRandomStringCharacters.asciiPrintableCharacters,
		]);
	}

	if (type === RandomStringType.Alphanumeric) {
		return GenerateForNumberRandom(length, [
			...CryptoRandomStringCharacters.alphanumericCharacters,
		]);
	}

	if (type === RandomStringType.Custom && characters != undefined) {
		return GenerateForNumberRandom(length, [...characters]);
	}
	return "";
};

export const CryptoRandomStringCharacters = {
	urlSafeCharacters: [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~"],
	numericCharacters: [..."0123456789"],
	distinguishableCharacters: [..."CDEHKMPRTUWXY012458"],
	asciiPrintableCharacters: [
		..."!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
	],
	alphanumericCharacters: [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"],
	customDefaultCharacters: [..."😀😁😂🤣😃😄😅😆😉😊😋😎😍😘✨🚗🚓🚕🚀🛰⛵💙❎✅"],
};
