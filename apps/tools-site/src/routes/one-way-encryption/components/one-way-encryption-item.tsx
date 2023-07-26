import { Button, Checkbox, Divider, Input, Radio, Space, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { FormatType, OneWayEncryptionType } from "../types";
import { CryptoOneWayEncryption } from "../utils";
import { useTranslation } from "nsp-i18n";

export type OneWayEncryptionItemProps = {
	encryptionType: OneWayEncryptionType;
	description?: React.ReactNode;
};

const OneWayEncryptionItem = (props: OneWayEncryptionItemProps) => {
	const { t } = useTranslation();
	const [originText, setOriginText] = useState("");
	const [cipherText, setCipherText] = useState("");
	const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
	const [codeType, setCodeType] = useState<FormatType>(FormatType.Text);
	const [outCodeType, setOutCodeType] = useState<FormatType>(FormatType.Hex);

	const textEncode = useCallback(
		(text: string) => {
			try {
				if (text == "") {
					setCipherText("");
				} else {
					const result = CryptoOneWayEncryption(
						props.encryptionType,
						codeType,
						outCodeType,
						text
					);
					setCipherText(result);
				}
			} catch (err) {
				setCipherText(t("OneWayEncryption.FormatError"));
			}
		},
		[codeType, outCodeType, props.encryptionType, t]
	);

	useEffect(() => {
		if (autoUpdate) {
			textEncode(originText);
		}
	}, [originText, codeType, autoUpdate, outCodeType, textEncode]);

	const handleOutput = useCallback(() => {
		textEncode(originText);
	}, [textEncode, originText]);

	return (
		<React.Fragment>
			{props.description && (
				<React.Fragment>
					{props.description}
					<Divider />
				</React.Fragment>
			)}
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
		</React.Fragment>
	);
};

export default OneWayEncryptionItem;
