import _ from "lodash";

/**
 * @description 将多段落中每个段落进行处理，首行缩进两个，尾部填满空格
 * @param paragraphs 进行换行分割后的多段落
 * @param wordsPerLine 一行几个字
 * @returns
 */
const paragraphFormatted = (paragraphs: string[], wordsPerLine: number) => {
	let newStrArr: string[] = [];
	for (let i = 0; i < paragraphs.length; i++) {
		let temp1 = [...paragraphs[i]];
		temp1.unshift(" ", " ");
		const excess = temp1.length % wordsPerLine;
		if (excess != 0) {
			temp1 = temp1.concat(_.fill(Array(wordsPerLine - excess), " "));
		}

		newStrArr = newStrArr.concat(temp1);
	}
	return newStrArr;
};

/**
 * @description 将文本格式化成多个段落，每个段落由每个字组成数组
 * @param text 文本
 * @param linesPerSegment 多少行分割
 * @param wordsPerLine 每行字数
 */
export const textFormatted = (
	text: string,
	linesPerSegment: number,
	wordsPerLine: number
): string[][] => {
	const paragraphList = text.replaceAll("\r\n", "\n").replaceAll("\r", "\n").split("\n");
	const textArr: string[] = paragraphFormatted(paragraphList, wordsPerLine);
	const segments: string[][] = [];
	const sum = linesPerSegment * wordsPerLine;
	for (let i = 0; i < textArr.length; i += sum) {
		let segmentLines = textArr.slice(i, i + sum);
		if (segmentLines.length < sum) {
			const excessCount = sum - segmentLines.length;
			segmentLines = segmentLines.concat(_.fill(Array(excessCount), " "));
		}
		segments.push(segmentLines);
	}
	return segments;
};

// 单行字帖
export const textSingleReplace = (text: string | undefined): string[] => {
	if (text == undefined) {
		return [];
	}
	const wordList = text
		.replaceAll("\r\n", "")
		.replaceAll("\r", "")
		.replaceAll("\n", "")
		.replaceAll("，", "")
		.replaceAll("。", "")
		.replaceAll(" ", "")
		.split("");
	return wordList;
};

/**
 *
 * @param text
 * @param linesPerSegment
 * @param wordsPerLine
 * @param repeatLine
 */
export const textFormattedToSingleWord = (
	text: string,
	linesPerSegment: number,
	wordsPerLine: number,
	repeatLine: number
): string[][] => {
	const wordList = textSingleReplace(text);
	let textArr: string[] = [];
	for (let i = 0; i < wordList.length; i++) {
		const temp = _.fill(Array(wordsPerLine), wordList[i]);
		let len = repeatLine;
		while (len > 0) {
			textArr = textArr.concat(temp);
			len--;
		}
	}

	const segments: string[][] = [];
	const sum = linesPerSegment * wordsPerLine;
	for (let i = 0; i < textArr.length; i += sum) {
		let segmentLines = textArr.slice(i, i + sum);
		if (segmentLines.length < sum) {
			const excessCount = sum - segmentLines.length;
			segmentLines = segmentLines.concat(_.fill(Array(excessCount), " "));
		}
		segments.push(segmentLines);
	}
	return segments;
};
