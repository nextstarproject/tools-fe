import { Button, Checkbox, Divider, Input, Radio, Space, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { FormatType, HmacType } from "../types";
import { CryptoHmac } from "../utils";
import { useTranslation } from "nsp-i18n";

export type HmacItemProps = {
	hmacType: HmacType;
};

const HmacItem = ({ hmacType }: HmacItemProps) => {
	const { t } = useTranslation();
	const [originText, setOriginText] = useState("");
	const [cipherText, setCipherText] = useState("");
	const [originKey, setOriginKey] = useState("");
	const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
	const [codeType, setCodeType] = useState<FormatType>(FormatType.Text);
	const [outCodeType, setOutCodeType] = useState<FormatType>(FormatType.Hex);

	const textEncode = useCallback(
		(text: string, key: string) => {
			try {
				if (text == "" || key == "") {
					setCipherText("");
				} else {
					const result = CryptoHmac(hmacType, codeType, outCodeType, text, key);
					setCipherText(result);
				}
			} catch (err) {
				setCipherText(t("OneWayEncryption.FormatError"));
			}
		},
		[hmacType, codeType, outCodeType, t]
	);

	const handleOutput = useCallback(() => {
		textEncode(originText, originKey);
	}, [textEncode, originText, originKey]);

	useEffect(() => {
		if (autoUpdate) {
			textEncode(originText, originKey);
		}
	}, [originText, originKey, codeType, autoUpdate, outCodeType, textEncode]);

	return (
		<div>
			<Space direction={"vertical"} style={{ width: "100%" }}>
				<Space>
					<Typography.Text>{t("OneWayEncryption.InputType")}:</Typography.Text>
					<Radio.Group value={codeType} onChange={(e) => setCodeType(e.target.value)}>
						<Radio value={FormatType.Text}>Text</Radio>
					</Radio.Group>
				</Space>
				<Input.TextArea
					rows={4}
					placeholder={t("OneWayEncryption.OriginText")}
					value={originText}
					onChange={(e) => setOriginText(e.target.value)}
					allowClear={true}
				/>
				<Input.TextArea
					rows={4}
					placeholder={"Key"}
					value={originKey}
					onChange={(e) => setOriginKey(e.target.value)}
					allowClear={true}
				/>
			</Space>
			<Divider>
				<Space>
					<Button onClick={handleOutput}>{t("OneWayEncryption.Output")}</Button>
					<Checkbox
						checked={autoUpdate}
						onChange={(e) => setAutoUpdate(e.target.checked)}
					>
						{t("OneWayEncryption.AutoUpdate")}
					</Checkbox>
				</Space>
			</Divider>
			<Space direction={"vertical"} style={{ width: "100%" }}>
				<Space>
					<Typography.Text>{t("OneWayEncryption.OutputType")}:</Typography.Text>
					<Radio.Group
						value={outCodeType}
						onChange={(e) => setOutCodeType(e.target.value)}
					>
						<Radio value={FormatType.Hex}>Hex</Radio>
						<Radio value={FormatType.Base64}>Base64</Radio>
					</Radio.Group>
				</Space>
				<Input.TextArea
					rows={4}
					placeholder={t("OneWayEncryption.CipherText")}
					readOnly={true}
					value={cipherText}
				/>
			</Space>
		</div>
	);
};

export default HmacItem;
