import { NonEmptyArray } from "../constants";

/**
 * @description 默认进制字符 numeric(10) + letter(52)
 */
export const binaryBase: NonEmptyArray<string> = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];

/**
 * @description 自定义十进制数字转换
 *
 */
export class binaryRadix {
	/**
	 * @description 默认进制字符 numeric(10) + letter(52)
	 */
	private static readonly base: NonEmptyArray<string> = binaryBase;
	/**
	 * @description 最大数字
	 */
	private static readonly maxNum = Math.pow(2, 53);

	/**
	 * @description 将十进制数字转为进制字符串
	 * @param num
	 * @param radix
	 * @param charAt
	 * @returns
	 */
	static encode(
		num: number,
		radix?: number | undefined,
		charAt?: NonEmptyArray<string> | undefined
	): string {
		const chars = charAt ?? this.base;
		const _radix = radix ?? chars.length;
		if (num > binaryRadix.maxNum) {
			return "-";
		}

		const arr = [];
		let result = "",
			negative = false;

		if (num == 0) {
			return chars[0];
		}
		if (num < 0) {
			negative = true;
			num = -num;
		}

		while (num) {
			arr.push(chars[num % _radix]);
			num = Math.floor(num / _radix);
		}

		result = arr.reverse().join("");
		return negative ? "-" + result : result;
	}

	/**
	 * @description 将进制字符串转为十进制数字
	 * @param num
	 * @param radix
	 * @param charAt
	 * @returns
	 */
	static decode(
		str: string,
		radix?: number | undefined,
		charAt?: NonEmptyArray<string> | undefined
	): number {
		const chars = charAt ?? this.base;
		const _radix = radix ?? chars.length;
		let result = 0,
			negative = false;

		if (str.indexOf("-") === 0) {
			negative = true;
			str = str.slice(1);
		}

		for (let index = 0; index < str.length; index++) {
			const c = str.charAt(index);
			const tableIndex = chars.indexOf(c);
			result += tableIndex * Math.pow(_radix, str.length - index - 1);
		}

		return Number(negative ? "-" + result : result);
	}
}
