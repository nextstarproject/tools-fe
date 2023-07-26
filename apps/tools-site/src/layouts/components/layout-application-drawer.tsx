import { selectGlobalState, selectLayoutState } from "@project-self/store/selector";
import { useAppDispatch, useAppSelector } from "@project-self/store/store";
import { setApplicationDrawer } from "../rtk/layout-slice";
import { Col, Drawer, Empty, Row } from "antd";
import { DynamicAntIcon } from "@project-self/components/dynamic-icon/dynamic-icon";
import { AHrefRelAllNo, AHrefRelReferrer } from "@project-self/assets/consts/html-tag-consts";
import { useCallback } from "react";
import { useTranslation } from "nsp-i18n";

interface ApplicationItem {
	id: number;
	name: string;
	target: string;
	url: string;
	icon: string;
	rel?: string;
}

const applications: ApplicationItem[] = [
	{
		id: 100000,
		name: "Github",
		target: "_blank",
		url: "https://github.com/nextstarproject/tools-fe",
		icon: "nsp-GitHub",
		rel: AHrefRelAllNo,
	},
];

const LayoutApplicationDrawer = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const layoutState = useAppSelector(selectLayoutState);
	const globalState = useAppSelector(selectGlobalState);
	const onClose = () => {
		dispatch(setApplicationDrawer(false));
	};

	const getApplicationCol = useCallback(() => {
		return applications.map((x) => (
			<Col span={12} key={x.id} className="h-12">
				<div
					className="box-border h-full w-full transition-all ease-in-out duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-purple-500 hover:to-pink-500 rounded"
					style={{ padding: "1px" }}
				>
					<a
						href={x.url}
						target={x.target}
						title={t("Layout.Application.JumpLinkTo") + x.name}
						rel={x.rel ?? AHrefRelAllNo}
						className={`${
							globalState.theme.isDark ? "bg-slate-800" : "bg-white"
						} box-border flex justify-items-start justify-between content-center items-center self-center h-full w-full rounded p-2 text-blue-500 hover:text-purple-500`}
					>
						<DynamicAntIcon type={x.icon} className="text-2xl" />
						<span className="flex-1 grow mx-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">
							{x.name}
						</span>
						{x.target == "_blank" && (
							<DynamicAntIcon type="nsp-share" className="text-2xl" />
						)}
					</a>
				</div>
			</Col>
		));
	}, [globalState.theme.isDark]);

	return (
		<Drawer
			title={t("Layout.Application.SiteOther")}
			placement="left"
			onClose={onClose}
			width={4 * 120}
			closeIcon={<DynamicAntIcon type={"nsp-menu-application"} />}
			open={layoutState.applicationDrawer}
		>
			<Row gutter={[24, 16]}>
				{applications.length == 0 ? (
					<div className="text-center w-full">
						<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
					</div>
				) : (
					getApplicationCol()
				)}
			</Row>
		</Drawer>
	);
};

export default LayoutApplicationDrawer;
