import { useState } from "react";
import { Button, InputNumber, List, Space, Typography } from "antd";
import { isNumber } from "lodash";
import { UUIDType } from "../types";
import { UuidGenerator } from "../utils";
import { useTranslation } from "nsp-i18n";

type GuidPageItemProps = {
	format: number;
	type: UUIDType;
	count: number;
};

const UuidPageItem = (props: GuidPageItemProps) => {
	const { t } = useTranslation();
	const [count, setCount] = useState(props.count);
	const [strList, setStrList] = useState<string[]>([]);
	const handleGenerate = () => {
		const arr: string[] = [];
		for (let i = 0; i < count; i++) {
			arr.push(UuidGenerator(props.type, props.format));
		}
		setStrList(arr);
	};

	return (
		<Space direction={"vertical"}>
			<Space size={"large"}>
				<InputNumber
					addonBefore={t("UUID.GenerateNumber")}
					defaultValue={count}
					onChange={(v) => (isNumber(v) ? setCount(v) : setCount(count))}
				/>
				<Button type="primary" onClick={handleGenerate}>
					{t("UUID.GenerateAction")}
				</Button>
			</Space>
			<List
				bordered
				dataSource={strList}
				renderItem={(item) => (
					<List.Item>
						<Typography.Paragraph copyable>{item}</Typography.Paragraph>
					</List.Item>
				)}
			/>
		</Space>
	);
};
export default UuidPageItem;
