import React, { useEffect, useState } from "react";
import ChangeLog from "../../../../CHANGELOG.md?url";
import MarkdownIt from "markdown-it";
import HighlightJs from "highlight.js";
import { Skeleton } from "antd";
const VersionChanges = () => {
    const [mdText, setMdText] = useState("");
    const [active, setActive] = useState(true);
    useEffect(() => {
        fetch(ChangeLog)
            .then((res) => res.text())
            .then((x) => {
                // @ts-expect-error markdown-it not type
                const md = new MarkdownIt({
                    html: true, // Enable HTML tags in source
                    xhtmlOut: true, // Use '/' to close single tags (<br />).
                    // This is only for full CommonMark compatibility.
                    breaks: true, // Convert '\n' in paragraphs into <br>
                    langPrefix: "language-", // CSS language prefix for fenced blocks. Can be
                    // useful for external highlighters.
                    linkify: true, // Auto convert URL-like text to links

                    // Enable some language-neutral replacement + quotes beautification
                    // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
                    typographer: false,
                    highlight: function (str, lang) {
                        if (lang && HighlightJs.getLanguage(lang)) {
                            try {
                                return (
                                    '<pre class="hljs"><code>' +
                                    HighlightJs.highlight(str, {
                                        language: lang,
                                        ignoreIllegals: true,
                                    }).value +
                                    "</code></pre>"
                                );
                            } catch (__) {
                                console.log(__);
                            }
                        }

                        return (
                            '<pre class="hljs"><code>' +
                            md.utils.escapeHtml(str) +
                            "</code></pre>"
                        );
                    },
                });
                const htmlText = md.render(x);
                setMdText(htmlText);
                setActive(false);
            });
    }, []);
    return (
        <section className={"bg-white h-full overflow-auto"}>
            {active && <Skeleton active />}
            <p
                className={"nsp-markdown"}
                dangerouslySetInnerHTML={{ __html: mdText }}
            ></p>
        </section>
    );
};

export default VersionChanges;
