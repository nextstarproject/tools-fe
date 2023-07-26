import { useCallback, useState } from "react";
import { Checkbox, Space, Tabs } from "antd";
import useTabKey from "@project-self/hooks/useTabKey";
import { UUIDType, UuidGeneratorFormat } from "./types";
import UuidPageItem from "./components/uuid-page-item";
import { useTranslation } from "nsp-i18n";

const UuidPage = () => {
	const { t } = useTranslation();
	const [tabKey, setTabKey] = useTabKey(UUIDType.v4);
	const [format, setFormat] = useState(0);

	const handleTabSwitch = (key: string) => {
		setTabKey(key);
	};

	const handleFormatChange = useCallback(
		(type: UuidGeneratorFormat) => {
			if ((format & type) == type) {
				setFormat(format - type);
			} else {
				setFormat(format | type);
			}
		},
		[format]
	);
	return (
		<section className={"h-full"}>
			<Space>
				<Checkbox
					checked={
						(format & UuidGeneratorFormat.Uppercase) == UuidGeneratorFormat.Uppercase
					}
					onChange={() => handleFormatChange(UuidGeneratorFormat.Uppercase)}
				>
					{t("UUID.Uppercase")}
				</Checkbox>
				<Checkbox
					checked={(format & UuidGeneratorFormat.Braces) == UuidGeneratorFormat.Braces}
					onChange={() => handleFormatChange(UuidGeneratorFormat.Braces)}
				>
					{t("UUID.Braces")}
				</Checkbox>
				<Checkbox
					checked={(format & UuidGeneratorFormat.Hyphens) == UuidGeneratorFormat.Hyphens}
					onChange={() => handleFormatChange(UuidGeneratorFormat.Hyphens)}
				>
					{t("UUID.NoHyphens")}
				</Checkbox>
			</Space>
			<Tabs
				className={"h-full overflow-auto"}
				defaultActiveKey={tabKey}
				onChange={handleTabSwitch}
				items={[
					{
						label: UUIDType.v4,
						key: UUIDType.v4,
						children: <UuidPageItem format={format} type={UUIDType.v4} count={10} />,
					},
				]}
			/>
		</section>
	);
};

export default UuidPage;
