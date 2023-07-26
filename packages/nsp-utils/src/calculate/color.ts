import { ColorAlphaHexType, colorAlphaHex } from "./colorAlphaHex";

export const Alpha2Hex = (alpha: ColorAlphaHexType) => {
	const hex = colorAlphaHex[alpha];
	return hex;
};
