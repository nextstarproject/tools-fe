import { AHrefRelAllNo } from "@project-self/assets/consts/html-tag-consts";
import { Layout, theme } from "antd";

const LayoutFooter = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Layout.Footer
			className="px-2 py-4 text-center shadow-inner"
			style={{ backgroundColor: colorBgContainer }}
		>
			<span>
				Copyright © 2022-2023{" "}
				<a
					href="https://github.com/nextstarproject"
					rel={AHrefRelAllNo}
					target={"_blank"}
					title="@NextStarProject"
				>
					@NextStarProject
				</a>
			</span>
		</Layout.Footer>
	);
};

export default LayoutFooter;
