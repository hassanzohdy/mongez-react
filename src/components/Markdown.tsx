import React from 'react'
import hljs from 'highlight.js';
import BaseMarkdown from 'markdown-to-jsx';
import 'highlight.js/styles/atom-one-dark.css';

export default function Markdown({ children = null, options = {
    // forceInline: true,
    forceBlock: true,
} }) {
    const rootRef = React.useRef<HTMLDivElement>();

    React.useEffect(() => {
        rootRef.current.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block as any);
        });
    }, [children]);

    return (
        <div ref={rootRef}>
            <BaseMarkdown options={options}>{children}</BaseMarkdown>
        </div>
    )
}
