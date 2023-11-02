import { Divider, Tabs, Typography } from "antd";
import { CopyBookType } from "./types";
import useTabKey from "@project-self/hooks/useTabKey";
import { useTranslation } from "nsp-i18n";
import ArticleTab from "./components/aritcle-tab";
import React from "react";

const CopyBook = () => {
	const [tabKey, setTabKey] = useTabKey(CopyBookType.SingeLine);
	const { t } = useTranslation();

	const handleTabSwitch = (key: string) => {
		setTabKey(key);
	};

	return (
		<section className={"h-full"}>
			<Tabs
				className={"h-full overflow-auto"}
				defaultActiveKey={tabKey}
				onChange={handleTabSwitch}
				items={[
					{
						label: "单字字帖",
						key: CopyBookType.SingeLine,
						children: (
							<React.Fragment>
								<span>SingeLine</span>
							</React.Fragment>
						),
					},
					{
						label: "文章字帖",
						key: CopyBookType.Article,
						children: <ArticleTab />,
					},
				]}
			/>
		</section>
	);
};

export default CopyBook;
