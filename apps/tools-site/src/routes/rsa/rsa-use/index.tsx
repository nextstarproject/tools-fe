import { useState } from "react";
import { Divider } from "antd";
import { defaultGenerateKey, RsaKeyContext } from "../context";
import RsaGenerateMain from "../components/rsa-generate-main";
import RsaUseMain from "./components/rsa-use-main";

const RsaUse = () => {
	const [publicKey, setPublicKey] = useState(defaultGenerateKey.publicKey);
	const [privateKey, setPrivateKey] = useState(defaultGenerateKey.privateKey);

	return (
		<section className={"h-full overflow-auto p-1"}>
			<RsaKeyContext.Provider value={{ privateKey, publicKey, setPublicKey, setPrivateKey }}>
				<RsaGenerateMain isSingle={false} />
				<Divider />
				<RsaUseMain />
			</RsaKeyContext.Provider>
		</section>
	);
};

export default RsaUse;
