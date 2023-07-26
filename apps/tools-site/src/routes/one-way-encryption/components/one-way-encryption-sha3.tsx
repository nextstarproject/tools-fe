import { Button, Checkbox, Divider, Input, Radio, Space, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { FormatType } from "../types";
import { useTranslation } from "nsp-i18n";
import { AHrefRelAllNo } from "@project-self/assets/consts/html-tag-consts";

const OneWayEncryptionSha3 = () => {
	const { t } = useTranslation();
	const [originText, setOriginText] = useState("");
	const [cipherText, setCipherText] = useState("");
	const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
	const [codeType, setCodeType] = useState<FormatType>(FormatType.Text);
	const [outputLen, setOutputLen] = useState<number>(224);
	const [outCodeType, setOutCodeType] = useState<FormatType>(FormatType.Hex);

	const textEncode = useCallback(
		(text: string, len: number) => {
			try {
				if (text == "") {
					setCipherText("");
				} else {
					const result = CryptoJS.SHA3(
						codeType == FormatType.Hex ? CryptoJS.enc.Hex.parse(text) : text,
						{ outputLength: len }
					);
					setCipherText(
						result.toString(
							outCodeType == FormatType.Hex ? CryptoJS.enc.Hex : CryptoJS.enc.Base64
						)
					);
				}
			} catch (err) {
				setCipherText(t("OneWayEncryption.FormatError"));
			}
		},
		[codeType, outCodeType, t]
	);

	const handleOutput = useCallback(() => {
		textEncode(originText, outputLen);
	}, [textEncode, originText, outputLen]);

	useEffect(() => {
		if (autoUpdate) {
			textEncode(originText, outputLen);
		}
	}, [originText, codeType, autoUpdate, outCodeType, outputLen, textEncode]);

	return (
		<>
			<Typography.Paragraph>{t("OneWayEncryption.Sha3.Description")}</Typography.Paragraph>
			<Typography.Paragraph>
				--
				<Typography.Link
					href={t("OneWayEncryption.Sha3.Link")}
					target={"_blank"}
					rel={AHrefRelAllNo}
				>
					{t("COMMON.WikiPedia")}
				</Typography.Link>
			</Typography.Paragraph>
			<Divider />
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
			<br />
			<Space direction={"vertical"} style={{ width: "100%" }}>
				<Space>
					<Typography.Text>{t("OneWayEncryption.OutputLength")}:</Typography.Text>
					<Radio.Group
						value={outputLen}
						onChange={(e) => {
							setOutputLen(e.target.value);
							if (autoUpdate) {
								textEncode(originText, e.target.value);
							}
						}}
					>
						<Radio value={224}>224</Radio>
						<Radio value={256}>256</Radio>
						<Radio value={384}>384</Radio>
						<Radio value={512}>512</Radio>
					</Radio.Group>
				</Space>
				<Space>
					<Typography.Text>{t("OneWayEncryption.OutputType")}:</Typography.Text>
					<Radio.Group
						value={outCodeType}
						onChange={(e) => {
							setOutCodeType(e.target.value);
							if (autoUpdate) {
								textEncode(originText, e.target.value);
							}
						}}
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
		</>
	);
};

export default OneWayEncryptionSha3;
