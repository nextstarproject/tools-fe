import { Button, Col, Input, notification, Row, Space, Spin, Typography } from "antd";
import { useCallback, useContext, useState } from "react";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { RsaKeyContext } from "../../context";
import { decryptByPrivate, encryptByPublic } from "../../utils";
import { useDebounceFn } from "ahooks";
import { useTranslation } from "nsp-i18n";

const RsaUseMain = () => {
	const { t } = useTranslation();
	const rsaKey = useContext(RsaKeyContext);
	const [plainText, setPlainText] = useState("");
	const [cipherText, setCipherText] = useState("");
	const [loading, setLoading] = useState(false);

	const encryptByPublicHandle = useCallback(() => {
		setLoading(true);
		encryptByPublic(rsaKey.publicKey, plainText)
			.then((x) => {
				setCipherText(x);
			})
			.catch((x) => {
				notification["error"]({
					message: t("RSA.UseEncryptError"),
					description: x,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	}, [plainText, rsaKey.publicKey, t]);

	const decryptByPrivateHandle = useCallback(() => {
		setLoading(true);
		decryptByPrivate(rsaKey.privateKey, cipherText)
			.then((x) => {
				setPlainText(x);
			})
			.catch((x) => {
				notification["error"]({
					message: t("RSA.UseDecryptError"),
					description: x,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	}, [cipherText, rsaKey.privateKey, t]);

	const encryptByPublicAction = useDebounceFn(encryptByPublicHandle, {
		wait: 500,
	});
	const decryptByPrivateAction = useDebounceFn(decryptByPrivateHandle, {
		wait: 500,
	});

	return (
		<Spin spinning={loading}>
			<Row gutter={[4, 4]} align={"middle"}>
				<Col span={10}>
					<Typography.Title level={5}>{t("RSA.UsePlainText")}</Typography.Title>
					<Input.TextArea
						rows={13}
						value={plainText}
						onChange={(e) => setPlainText(e.target.value)}
						allowClear
					/>
				</Col>
				<Col span={4}>
					<Space direction={"vertical"} className={"w-full"} align={"center"}>
						<Button
							icon={<RightCircleOutlined />}
							type={"primary"}
							onClick={() => encryptByPublicAction.run()}
						>
							{t("RSA.UseEncrypt")}
						</Button>
						<Button
							icon={<LeftCircleOutlined />}
							type={"primary"}
							onClick={() => decryptByPrivateAction.run()}
						>
							{t("RSA.UseDecrypt")}
						</Button>
					</Space>
				</Col>
				<Col span={10}>
					<Typography.Title level={5}>{t("RSA.UseCipherText")}</Typography.Title>
					<Input.TextArea
						rows={13}
						value={cipherText}
						onChange={(e) => setCipherText(e.target.value)}
						allowClear
					/>
				</Col>
			</Row>
		</Spin>
	);
};
export default RsaUseMain;
