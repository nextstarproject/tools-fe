import React from "react";

export const RsaGeneratePublicKey = "rsa.generate-public-key";
export const RsaGeneratePrivateKey = "rsa.generate-private-key";

export interface IGenerateKey {
	publicKey: string;
	privateKey: string;
}

export interface IGenerateKeyContext extends IGenerateKey {
	setPublicKey: Nullable<React.Dispatch<React.SetStateAction<string>>>;
	setPrivateKey: Nullable<React.Dispatch<React.SetStateAction<string>>>;
}

export const minBit = 8;
export const maxBit = 4096;
export const stepBit = 8;
