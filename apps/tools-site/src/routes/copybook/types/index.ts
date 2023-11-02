import { Color } from "antd/es/color-picker";

export const enum CopyBookType {
	SingeLine = "SingeLine",
	Article = "Article",
}

export type articleFormType = {
	pageHeader?: string;
	fontFamily: string;
	text: string;
	color: Color | string;
	useBg: boolean;
	usePageFooter: boolean;
};
