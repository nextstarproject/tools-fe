import { useState } from "react";
import { Editor } from "@bytemd/react";
import zhCN from "bytemd/locales/zh_Hans.json";
import enUS from "bytemd/locales/en.json";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";

import "bytemd/dist/index.css";
import "highlight.js/styles/atom-one-dark.css";
import "katex/dist/katex.css";
import { useAppSelector } from "@project-self/store/store";
import { selectGlobalState } from "@project-self/store/selector";

const plugins = [
	breaks(),
	frontmatter(),
	gemoji(),
	gfm(),
	highlight(),
	math(),
	mediumZoom(),
	mermaid(),
	// Add more plugins here
];
const MarkdownPage = () => {
	const globalState = useAppSelector(selectGlobalState);
	const [value, setValue] = useState("");
	return (
		<section className="overflow-auto flex-1 [&>div]:h-full [&>div>div]:h-full [&>div>.bytemd-fullscreen]:z-[500] !p-0 !m-0">
			<Editor
				mode={"split"}
				value={value}
				locale={globalState.language == "en-US" ? enUS : zhCN}
				plugins={plugins}
				onChange={(v) => {
					setValue(v);
				}}
			/>
		</section>
	);
};

export default MarkdownPage;
