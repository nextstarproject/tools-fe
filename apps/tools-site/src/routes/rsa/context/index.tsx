import { IGenerateKeyContext } from "../types";
import React from "react";

export const defaultGenerateKey: IGenerateKeyContext = {
	publicKey: "",
	privateKey: "",
	setPublicKey: null,
	setPrivateKey: null,
};

export const RsaKeyContext = React.createContext(defaultGenerateKey);
