export enum RandomStringType {
	Custom = "Custom",
	UrlSafe = "Url Safe",
	Numeric = "Numeric",
	Distinguishable = "Distinguishable",
	AsciiPrintable = "Ascii Printable",
	Alphanumeric = "Alphanumeric",
}

export interface ICryptoRandomStringOptions {
	length: number;
	type: RandomStringType;
	characters?: string;
}
