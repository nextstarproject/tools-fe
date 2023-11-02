import { Color } from "antd/es/color-picker";

export const enum CopyBookType {
	SingeLine = "SingeLine",
	Article = "Article",
}

export type articleFormType = {
	fontFamily: string;
	text: string;
	color: Color | string;
	useBg: boolean;
};
