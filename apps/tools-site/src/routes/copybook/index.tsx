import { Button, Input } from "antd";
import PrintModal from "./components/print-modal";
import { useState } from "react";
import value from "./test.txt?raw";

const CopyBook = () => {
	const [open, setOpen] = useState(false);
	const [content, setContent] = useState(value);
	const [fontFamily, setFontFamily] = useState(`"方正行楷细 简", FZXingKaiXiS`);
	return (
		<section>
			<p>Edge无法读取系统字体，Chrome可以的</p>
			<Input.TextArea
				rows={10}
				value={content}
				onChange={(e) => setContent(e.target.value)}
			></Input.TextArea>
			<Input value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} />
			<Button onClick={() => setOpen(true)}>生成字帖</Button>
			<PrintModal content={content} open={open} setOpen={setOpen} fontFamily={fontFamily} />
		</section>
	);
};

export default CopyBook;
