import { useCallback, useEffect, useState } from "react";
import { getContributorList } from "./rtk/service";
import { useAppDispatch, useAppSelector } from "@project-self/store/store";
import { selectContributorsState } from "./rtk/selector";
import { Avatar, Badge, Col, Row, Skeleton, theme } from "antd";
import { AHrefRelAllNo } from "@project-self/assets/consts/html-tag-consts";
import { DynamicAntIcon } from "@project-self/components/dynamic-icon/dynamic-icon";

const Contributors = () => {
	const contributorsState = useAppSelector(selectContributorsState);
	const [skeletonActive, setSkeletonActive] = useState(true);
	const dispatch = useAppDispatch();
	const {
		token: { colorBgContainer, colorText },
	} = theme.useToken();
	useEffect(() => {
		const init = async () => {
			if (contributorsState.userList.length == 0) {
				await dispatch(getContributorList());
			}
			setSkeletonActive(false);
		};
		init();
	}, []);

	const renderUserList = useCallback(() => {
		return (
			<Row gutter={[16, 8]} className="mt-6">
				{contributorsState.userList.map((x) => (
					<Col key={x.id} span={6} xl={4}>
						<a
							href={x.html_url}
							className={
								"flex items-center py-3 px-1 border-solid border rounded  border-gray-300 hover:border-sky-400  hover:!text-sky-500"
							}
							style={{
								backgroundColor: colorBgContainer,
								color: colorText,
							}}
							rel={AHrefRelAllNo}
							target={"_blank"}
						>
							<Badge count={x.contributions} overflowCount={999}>
								<Avatar
									shape="square"
									alt={x.login}
									src={x.avatar_url}
									size={"large"}
								/>
							</Badge>
							<span className="flex-1 grow mx-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">
								{x.login}
							</span>
							<DynamicAntIcon type="nsp-share" className="text-2xl" />
						</a>
					</Col>
				))}
			</Row>
		);
	}, [contributorsState.userList, colorBgContainer, colorText]);
	return (
		<section>
			{skeletonActive && <Skeleton avatar={{ shape: "circle", size: "default" }} active />}
			{!skeletonActive && renderUserList()}
		</section>
	);
};

export default Contributors;
