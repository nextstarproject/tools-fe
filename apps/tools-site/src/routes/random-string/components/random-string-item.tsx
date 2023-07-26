import { useState } from "react";
import { RandomStringType } from "../types";
import { CryptoRandomString, RandomString } from "../utils";
import { Alert, Button, Checkbox, Input, InputNumber, List, Space, Typography } from "antd";
import { isNumber } from "lodash";
import { useTranslation } from "nsp-i18n";
import { CheckboxChangeEvent } from "antd/es/checkbox";

export type RandomStringItemProps = {
	randomStringType: RandomStringType;
	characters: string[];
	readOnly?: boolean;
};
const RandomStringItem = (props: RandomStringItemProps) => {
	const { t } = useTranslation();
	const [len, setLen] = useState(32);
	const [count, setCount] = useState(10);
	const [strList, setStrList] = useState<string[]>([]);
	const [useRandom, setUseRandom] = useState(false);
	const [characters, setCharacters] = useState<string>([...props.characters].join(""));

	const generateCore = (): string[] => {
		const arr: string[] = [];
		for (let i = 0; i < count; i++) {
			arr.push(
				useRandom
					? RandomString({
							length: len,
							type: props.randomStringType,
							characters: characters,
					  })
					: CryptoRandomString({
							length: len,
							type: props.randomStringType,
							characters: characters,
					  })
			);
		}
		return arr;
	};

	const handleUseRandom = (e: CheckboxChangeEvent) => {
		setUseRandom(e.target.checked);
	};

	const handleGenerate = () => {
		setStrList(generateCore());
	};
	return (
		<Space direction={"vertical"}>
			<Typography.Paragraph>
				{t("RandomString.FormatComposition")}:
				<Alert
					className={"inline-block"}
					message={[...characters].join(" ")}
					banner
					showIcon={false}
					type={"info"}
				/>
			</Typography.Paragraph>
			<Input
				addonBefore={t("RandomString.Chars")}
				style={{ width: "620px" }}
				defaultValue={characters}
				value={characters}
				allowClear
				readOnly={props.readOnly ?? true}
				onChange={(e) => {
					if (props.readOnly == false) {
						setCharacters(e.target.value);
					}
				}}
			/>
			<Space size={"large"}>
				<InputNumber
					addonBefore={t("RandomString.GenerateNumber")}
					defaultValue={count}
					onChange={(v) => (isNumber(v) ? setCount(v) : setCount(count))}
				/>
				<InputNumber
					addonBefore={t("RandomString.GenerateLength")}
					defaultValue={len}
					onChange={(v) => (isNumber(v) ? setLen(v) : setLen(len))}
				/>
				<Checkbox onChange={handleUseRandom} checked={useRandom}>
					{t("RandomString.UseRandom")}
				</Checkbox>
				<Button type="primary" onClick={handleGenerate}>
					{t("RandomString.GenerateAction")}
				</Button>
			</Space>
			<List
				bordered
				dataSource={strList}
				style={{ overflow: "auth" }}
				renderItem={(item) => (
					<List.Item>
						<Typography.Paragraph style={{ margin: 0 }} copyable>
							{item}
						</Typography.Paragraph>
					</List.Item>
				)}
			/>
		</Space>
	);
};

export default RandomStringItem;
