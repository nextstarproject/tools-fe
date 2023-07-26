import useTabKey from "@project-self/hooks/useTabKey";
import { Divider, Tabs, Typography } from "antd";
import { HmacType } from "./types";

import HmacItem from "./components/hmac-item";
import { useTranslation } from "nsp-i18n";
import { AHrefRelAllNo } from "@project-self/assets/consts/html-tag-consts";

const Hmac = () => {
	const [tabKey, setTabKey] = useTabKey(HmacType.MD5);
	const { t } = useTranslation();

	const handleTabSwitch = (key: string) => {
		setTabKey(key);
	};

	return (
		<section className={"h-full flex flex-col"}>
			<Typography.Paragraph>{t("HMAC.Description")}</Typography.Paragraph>
			<Typography.Paragraph>
				--
				<Typography.Link href={t("HMAC.Link")} target={"_blank"} rel={AHrefRelAllNo}>
					{t("COMMON.WikiPedia")}
				</Typography.Link>
			</Typography.Paragraph>
			<Divider />
			<Tabs
				className={"flex-auto h-full overflow-auto"}
				defaultActiveKey={tabKey}
				onChange={handleTabSwitch}
				items={[
					{
						label: HmacType.MD5,
						key: HmacType.MD5,
						children: <HmacItem hmacType={HmacType.MD5} />,
					},
					{
						label: HmacType.SHA1,
						key: HmacType.SHA1,
						children: <HmacItem hmacType={HmacType.SHA1} />,
					},
					{
						label: HmacType.SHA224,
						key: HmacType.SHA224,
						children: <HmacItem hmacType={HmacType.SHA224} />,
					},
					{
						label: HmacType.SHA256,
						key: HmacType.SHA256,
						children: <HmacItem hmacType={HmacType.SHA256} />,
					},
					{
						label: HmacType.SHA384,
						key: HmacType.SHA384,
						children: <HmacItem hmacType={HmacType.SHA384} />,
					},
					{
						label: HmacType.SHA512,
						key: HmacType.SHA512,
						children: <HmacItem hmacType={HmacType.SHA512} />,
					},
					{
						label: HmacType.SHA3,
						key: HmacType.SHA3,
						children: <HmacItem hmacType={HmacType.SHA3} />,
					},
				]}
			/>
		</section>
	);
};

export default Hmac;
