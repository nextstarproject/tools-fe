import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { useAppSelector } from "@project-self/store/store";
import { selectGlobalState } from "@project-self/store/selector";

const TestPage = () => {
	const globalState = useAppSelector(selectGlobalState);
	const editorRef = useRef(null);
	const handleEditorDidMount = (editor: any, monaco: any) => {
		editorRef.current = editor;
	};
	return (
		<section className={"overflow-hidden m-0 p-0"}>
			<Editor
				onMount={handleEditorDidMount}
				height={"100%"}
				width={"100%"}
				theme={globalState.theme.isDark ? "vs-dark" : "light"}
				defaultLanguage="markdown"
				defaultValue="// some comment"
			/>
		</section>
	);
};

export default TestPage;
