import { useCallback, useContext, useState } from "react";
import { useDebounceFn } from "ahooks";
import { generateKeyAsync } from "../utils";
import {
	Button,
	Col,
	Input,
	InputNumber,
	notification,
	Row,
	Slider,
	Space,
	Spin,
	Tooltip,
	Typography,
} from "antd";
import { Link } from "react-router-dom";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { RsaGeneratePrivateKey, RsaGeneratePublicKey, maxBit, minBit, stepBit } from "../types";
import { RsaKeyContext } from "../context";
import { nsLocalStorage } from "@project-self/utils/storage";
import { useTranslation } from "nsp-i18n";

export type RsaGenerateMainProps = {
	isSingle: boolean;
};
const RsaGenerateMain = (props: RsaGenerateMainProps) => {
	const { t } = useTranslation();
	const rsaKey = useContext(RsaKeyContext);
	const [bitLength, setBitLength] = useState(512);
	const [loading, setLoading] = useState(false);
	const bitChangeDebounce = useDebounceFn(bitChangeFun, { wait: 400 });

	function bitChangeFun(newValue: number | null) {
		let _value = newValue;
		if (_value != null) {
			const decimals = _value / stepBit;
			const integerStr = decimals.toFixed();
			_value = Number(integerStr) * stepBit;
			if (_value < minBit) {
				_value = minBit;
			}
			if (_value > maxBit) {
				_value = maxBit;
			}
		}
		setBitLength(_value ?? 8);
	}

	const generateKey = useCallback(
		(count: number) => {
			setLoading(true);
			generateKeyAsync(count)
				.then((key) => {
					if (rsaKey.setPublicKey != null) {
						rsaKey.setPublicKey(key.publicKey);
					}
					if (rsaKey.setPrivateKey != null) {
						rsaKey.setPrivateKey(key.privateKey);
					}

					nsLocalStorage(RsaGeneratePublicKey, key.publicKey);
					nsLocalStorage(RsaGeneratePrivateKey, key.privateKey);
				})
				.catch((x) => {
					notification["error"]({
						message: t("RSA.GenerateError"),
						description: x,
					});
				})
				.finally(() => {
					setLoading(false);
				});
		},
		[rsaKey, t]
	);
	return (
		<Spin tip={t("RSA.GenerateIng")} spinning={loading}>
			{props.isSingle && (
				<Typography.Paragraph>
					{t("RSA.GenerateTips")}
					<Link to={"/safety/rsa-use"}>{t("RSA.GenerateHere")}</Link>
				</Typography.Paragraph>
			)}
			<Space align={"center"}>
				<Typography.Text>{t("RSA.GenerateSlideSelect")}:</Typography.Text>
				<Slider
					className={"w-[32rem]"}
					min={minBit}
					max={maxBit}
					step={stepBit}
					onChange={bitChangeFun}
					value={bitLength}
				/>
				<InputNumber
					min={minBit}
					max={maxBit}
					step={stepBit}
					className={"w-32"}
					addonAfter={t("RSA.GenerateDigits")}
					value={bitLength}
					onChange={bitChangeDebounce.run}
					onStep={bitChangeFun}
				/>
				<Tooltip title={t("RSA.GenerateToolTips")}>
					<ExclamationCircleOutlined />
				</Tooltip>
				<Button
					type={"primary"}
					icon={<CheckCircleOutlined />}
					loading={loading}
					onClick={() => generateKey(bitLength)}
				>
					{t("RSA.GenerateTwoKeys")}
				</Button>
			</Space>
			<Row gutter={[8, 8]}>
				<Col span={12}>
					<Typography.Title level={5}>{t("RSA.GeneratePublicKey")}</Typography.Title>
					<Input.TextArea
						rows={props.isSingle ? 26 : 10}
						readOnly={props.isSingle}
						allowClear={!props.isSingle}
						value={rsaKey.publicKey}
						onChange={(e) => {
							if (!props.isSingle) {
								if (rsaKey.setPublicKey) {
									rsaKey.setPublicKey(e.target.value);
								}
							}
						}}
					/>
				</Col>
				<Col span={12}>
					<Typography.Title level={5}>{t("RSA.GeneratePrivateKey")}</Typography.Title>
					<Input.TextArea
						rows={props.isSingle ? 26 : 10}
						readOnly={props.isSingle}
						allowClear={!props.isSingle}
						value={rsaKey.privateKey}
						onChange={(e) => {
							if (!props.isSingle) {
								if (rsaKey.setPrivateKey) {
									rsaKey.setPrivateKey(e.target.value);
								}
							}
						}}
					/>
				</Col>
			</Row>
		</Spin>
	);
};

export default RsaGenerateMain;
