export const acceptImageType = ".gif, .jfif, .jpe, .jpeg, .jpg, .png";

export const MIME: { [key: string]: string } = {
	pdf: "application/pdf",
	xls: "application/vnd.ms-excel",
	xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	zip: "application/zip",
	jpeg: "image/jpeg",
	jpg: "image/jpeg",
	png: "image/png",
	tiff: "image/tiff",
	gif: "image/gif",
	docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	doc: "application/msword",
	pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
	ppt: "application/vnd.ms-powerpoint",
	octetStream: "application/octet-stream",
	txt: "text/plain",
};

export type MIME_KEYS = keyof typeof MIME;
export const PREVIEW_MIME_TYPE_LIST = [
	...acceptImageType.split(",").map((type) => type.trim().slice(1)),
	"pdf",
];

export enum EXPORT_TYPE {
	PDF,
	EXCEL,
}

/**
const FileExtensionMap = [
	{
		extension: ".doc/.docx",
		icon: "fuji-file-type-doc",
	},
	{
		extension: ".jpg",
		icon: "fuji-file-type-jpg",
	},
	{
		extension: ".pdf",
		icon: "fuji-file-type-pdf",
	},
	{
		extension: ".png",
		icon: "fuji-file-type-png",
	},
	{
		extension: ".ppt",
		icon: "fuji-file-type-ppt",
	},
	{
		extension: ".xls/.xlsx",
		icon: "fuji-file-type-xsl",
	},
];
// 根据文件名或后缀名映射dynamicIcon的iconType
export const mapFileExtensionIconType = (fileNameOrExtension = "") => {
	const lastDotIndex = fileNameOrExtension.lastIndexOf(".");
	const fileExtension =
		lastDotIndex === -1 ? fileNameOrExtension : fileNameOrExtension.slice(lastDotIndex);
	return (
		FileExtensionMap.find((ext) => ext.extension.includes(fileExtension))?.icon ||
		"fuji-file-type-default"
	);
};
*/
