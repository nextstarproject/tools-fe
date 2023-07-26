import useTabKey from "@project-self/hooks/useTabKey";
import { Tabs, Typography } from "antd";
import React from "react";
import OneWayEncryptionItem from "./components/one-way-encryption-item";
import OneWayEncryptionSha3 from "./components/one-way-encryption-sha3";
import { OneWayEncryptionType } from "./types";
import { useTranslation } from "nsp-i18n";
import { AHrefRelAllNo } from "@project-self/assets/consts/html-tag-consts";

const OneWayEncryption = () => {
	const { t } = useTranslation();
	const [tabKey, setTabKey] = useTabKey(OneWayEncryptionType.MD5);

	const handleTabSwitch = (key: string) => {
		setTabKey(key);
	};

	const Md5Description = (
		<React.Fragment>
			<Typography.Paragraph>{t("OneWayEncryption.Md5.Description")}</Typography.Paragraph>
			<Typography.Paragraph>
				--
				<Typography.Link
					href={t("OneWayEncryption.Md5.Link")}
					target={"_blank"}
					rel={AHrefRelAllNo}
				>
					{t("COMMON.WikiPedia")}
				</Typography.Link>
			</Typography.Paragraph>
		</React.Fragment>
	);

	const Sha1Description = (
		<React.Fragment>
			<Typography.Paragraph>{t("OneWayEncryption.Sha1.Description")}</Typography.Paragraph>
			<Typography.Paragraph>
				--
				<Typography.Link
					href={t("OneWayEncryption.Sha1.Link")}
					target={"_blank"}
					rel={AHrefRelAllNo}
				>
					{t("COMMON.WikiPedia")}
				</Typography.Link>
			</Typography.Paragraph>
		</React.Fragment>
	);

	const Sha2Description = (
		<React.Fragment>
			<Typography.Paragraph>{t("OneWayEncryption.Sha2.Description")}</Typography.Paragraph>
			<Typography.Paragraph>
				--
				<Typography.Link
					href={t("OneWayEncryption.Sha2.Link")}
					target={"_blank"}
					rel={AHrefRelAllNo}
				>
					{t("COMMON.WikiPedia")}
				</Typography.Link>
			</Typography.Paragraph>
		</React.Fragment>
	);

	return (
		<section className={"h-full"}>
			<Tabs
				className={"h-full overflow-auto"}
				defaultActiveKey={tabKey}
				onChange={handleTabSwitch}
				items={[
					{
						label: OneWayEncryptionType.MD5,
						key: OneWayEncryptionType.MD5,
						children: (
							<OneWayEncryptionItem
								encryptionType={OneWayEncryptionType.MD5}
								description={Md5Description}
							/>
						),
					},
					{
						label: OneWayEncryptionType.SHA1,
						key: OneWayEncryptionType.SHA1,
						children: (
							<OneWayEncryptionItem
								encryptionType={OneWayEncryptionType.SHA1}
								description={Sha1Description}
							/>
						),
					},
					{
						label: OneWayEncryptionType.SHA224,
						key: OneWayEncryptionType.SHA224,
						children: (
							<OneWayEncryptionItem
								encryptionType={OneWayEncryptionType.SHA224}
								description={Sha2Description}
							/>
						),
					},
					{
						label: OneWayEncryptionType.SHA256,
						key: OneWayEncryptionType.SHA256,
						children: (
							<OneWayEncryptionItem
								encryptionType={OneWayEncryptionType.SHA256}
								description={Sha2Description}
							/>
						),
					},
					{
						label: OneWayEncryptionType.SHA384,
						key: OneWayEncryptionType.SHA384,
						children: (
							<OneWayEncryptionItem
								encryptionType={OneWayEncryptionType.SHA384}
								description={Sha2Description}
							/>
						),
					},
					{
						label: OneWayEncryptionType.SHA512,
						key: OneWayEncryptionType.SHA512,
						children: (
							<OneWayEncryptionItem
								encryptionType={OneWayEncryptionType.SHA512}
								description={Sha2Description}
							/>
						),
					},
					{
						label: OneWayEncryptionType.SHA3,
						key: OneWayEncryptionType.SHA3,
						children: <OneWayEncryptionSha3 />,
					},
				]}
			/>
		</section>
	);
};

export default OneWayEncryption;
