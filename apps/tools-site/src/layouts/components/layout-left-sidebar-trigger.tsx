import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";

export type LayoutLeftSideBarTriggerProps = {
	isAbsolute: boolean;
	collapsed: boolean;
	setCollapsed: (collapsed: boolean) => void;
};

const LayoutLeftSideBarTrigger = (props: LayoutLeftSideBarTriggerProps) => {
	return (
		<div onClick={() => props.setCollapsed(!props.collapsed)}>
			<Button
				shape={"circle"}
				icon={props.collapsed ? <RightOutlined /> : <LeftOutlined />}
				onClick={() => props.setCollapsed(!props.collapsed)}
			/>
		</div>
	);
};

export default LayoutLeftSideBarTrigger;
