import { Button, Input } from "antd";
import PrintModal from "./components/print-modal";
import { useState } from "react";

const CopyBook = () => {
	const [open, setOpen] = useState(false);
	const [content, setContent] = useState("");
	return (
		<section>
			<Input.TextArea rows={10} onChange={(e) => setContent(e.target.value)}></Input.TextArea>
			<Button onClick={() => setOpen(true)}>生成字帖</Button>
			<PrintModal content={content} open={open} setOpen={setOpen} />
		</section>
	);
};

export default CopyBook;
