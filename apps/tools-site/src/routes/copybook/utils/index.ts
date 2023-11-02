/**
 * @description 将多段落中每个段落进行处理，首行缩进两个，尾部填满空格
 * @param paragraphs 进行换行分割后的多段落
 * @param wordsPerLine 一行几个字
 * @returns
 */
export const paragraphFormatted = (paragraphs: string[], wordsPerLine: number) => {
	let newStrArr: string[] = [];
	for (let i = 0; i < paragraphs.length; i++) {
		const temp1 = [...paragraphs[i]];
		temp1.unshift(" ", " ");
		const excess = temp1.length % wordsPerLine;
		if (excess != 0) {
			for (let j = 0; j < wordsPerLine - excess; j++) {
				temp1.push(" ");
			}
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
		const segmentLines = textArr.slice(i, i + sum);
		if (segmentLines.length < sum) {
			const excessCount = sum - segmentLines.length;
			for (let j = 0; j < excessCount; j++) {
				segmentLines.push(" ");
			}
		}
		segments.push(segmentLines);
	}
	return segments;
};
