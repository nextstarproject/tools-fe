export enum UUIDType {
	v4 = "UUID V4",
}

export enum UuidGeneratorFormat {
	/* 大写 */
	Uppercase = 1 << 0,
	/* 有大括号 */
	Braces = 1 << 1,
	/* 无连字符 */
	Hyphens = 1 << 2,
}
