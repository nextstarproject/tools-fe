import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";

/**
 * !Notice: 所有需要跟随主题变更颜色的SVG必须没有Fill填充色，否则无法应用 `currentColor` 颜色变化
 */

type DynamicIconProps = {
	type: string;
	icon?: "iconfont" | "iconpark";
	style?: React.CSSProperties;
	wrapperStyle?: React.CSSProperties;
	className?: string;
	wrapperClassName?: string;
};

/**
 * This component can be used to infer Icon from {@link https://www.iconfont.cn/ | IconFont} and {@link https://iconpark.oceanengine.com/home | IconPark}
 * @param props
 * @param icon iconpark
 * @returns
 */
const DynamicIcon = (props: DynamicIconProps) => {
	const {
		type,
		icon = "iconpark",
		style = {},
		wrapperStyle = {},
		className = "",
		wrapperClassName = "",
	} = props;

	return (
		<span role="img" className={`anticon ${wrapperClassName}`} style={{ ...wrapperStyle }}>
			<svg
				width="1em"
				height="1em"
				fill="currentColor"
				style={{
					...style,
				}}
				className={`${icon == "iconfont" ? "icon" : "iconpark-icon"}${" " + className}`}
				aria-hidden
			>
				<use xlinkHref={`#${type}`} />
			</svg>
		</span>
	);
};

const DynamicAntIcon = createFromIconfontCN({
	scriptUrl: window._ICON_FONT_URL_,
});

export default DynamicIcon;

export { DynamicAntIcon };
