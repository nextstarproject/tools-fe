import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "antd";

const TestPage = () => {
	const editorRef = useRef(null);
	const handleEditorDidMount = (editor: any, monaco: any) => {
		editorRef.current = editor;
	};
	const showValue = () => {
		if (editorRef.current != null) {
			alert((editorRef.current as any).getValue());
		}
	};
	return (
		<section className={"overflow-hidden m-0 p-0"}>
			<Button onClick={showValue}>获取值</Button>
			<Editor
				onMount={handleEditorDidMount}
				height="100%"
				defaultLanguage="markdown"
				defaultValue="// some comment"
			/>
		</section>
	);
};

export default TestPage;
