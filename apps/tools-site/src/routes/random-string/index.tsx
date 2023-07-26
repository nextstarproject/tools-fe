import useTabKey from "@project-self/hooks/useTabKey";
import { Tabs } from "antd";
import { RandomStringType } from "./types";
import RandomStringItem from "./components/random-string-item";
import { CryptoRandomStringCharacters } from "./utils";

const RandomString = () => {
	const [tabKey, setTabKey] = useTabKey(RandomStringType.UrlSafe);

	const handleTabSwitch = (key: string) => {
		setTabKey(key);
	};
	return (
		<section className={"h-full"}>
			<Tabs
				className={"h-full overflow-auto"}
				defaultActiveKey={tabKey}
				onChange={handleTabSwitch}
				items={[
					{
						label: RandomStringType.UrlSafe,
						key: RandomStringType.UrlSafe,
						children: (
							<RandomStringItem
								randomStringType={RandomStringType.UrlSafe}
								characters={CryptoRandomStringCharacters.urlSafeCharacters}
							/>
						),
					},
					{
						label: RandomStringType.Numeric,
						key: RandomStringType.Numeric,
						children: (
							<RandomStringItem
								randomStringType={RandomStringType.Numeric}
								characters={CryptoRandomStringCharacters.numericCharacters}
							/>
						),
					},
					{
						label: RandomStringType.Distinguishable,
						key: RandomStringType.Distinguishable,
						children: (
							<RandomStringItem
								randomStringType={RandomStringType.Distinguishable}
								characters={CryptoRandomStringCharacters.distinguishableCharacters}
							/>
						),
					},
					{
						label: RandomStringType.AsciiPrintable,
						key: RandomStringType.AsciiPrintable,
						children: (
							<RandomStringItem
								randomStringType={RandomStringType.AsciiPrintable}
								characters={CryptoRandomStringCharacters.asciiPrintableCharacters}
							/>
						),
					},
					{
						label: RandomStringType.Alphanumeric,
						key: RandomStringType.Alphanumeric,
						children: (
							<RandomStringItem
								randomStringType={RandomStringType.Alphanumeric}
								characters={CryptoRandomStringCharacters.alphanumericCharacters}
							/>
						),
					},
					{
						label: RandomStringType.Custom,
						key: RandomStringType.Custom,
						children: (
							<RandomStringItem
								randomStringType={RandomStringType.Custom}
								characters={CryptoRandomStringCharacters.customDefaultCharacters}
								readOnly={false}
							/>
						),
					},
				]}
			/>
		</section>
	);
};

export default RandomString;
