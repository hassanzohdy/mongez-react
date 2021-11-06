import React from 'react'
import hljs from 'highlight.js';
import config from './../config';
import { MarkdownProps } from './types';
import BaseMarkdown from 'markdown-to-jsx';
import 'highlight.js/styles/atom-one-dark.css';
import { styled } from '@material-ui/styles';
import { stringStartsWithArabic } from '../utils/stringStartsWithArabic';

const regexp_list_line = /^[ \t]*(\*|\d+\.)/gm
const regexp_text_line = /^[ \t]*[^\s]+/gm

function add_newlines_to_markdown(text: string): string {
    const new_lines: string[] = []

    const lines = text.split("\n");

    lines.forEach((line, i) => {
        if (i > 0) {
            const previous_line = lines[i - 1]
            if (previous_line.match(regexp_text_line) && !previous_line.match(regexp_list_line)) {
                if (line.match(regexp_list_line)) {

                    new_lines[i - 1] = previous_line + "\n"
                }
                else if (line.match(regexp_text_line)) {
                    new_lines[i - 1] = previous_line + "<br>"
                } else {
                }
            }
        }
        new_lines.push(line)
    })

    const new_text = new_lines.join("\n")

    return new_text
}

function parseValue(value) {
    value = config.get('markdown.beforeParsing', value => value)(value);

    return add_newlines_to_markdown(value);
}

const Wrapper = styled('div')({
    '& ol, & ul': {
        padding: '0.1rem 1.7rem',
    },
})

export default function Markdown({ children = null, options = {
    // forceBlock: true,
} }: MarkdownProps) {
    const rootRef = React.useRef<HTMLDivElement>();

    const [value, setValue] = React.useState(() => (
        parseValue(children)
    ));

    if (!options.overrides) {
        options.overrides = config.get('markdown.overrides', {});
    }

    React.useEffect(() => {
        if (!children) return;
        rootRef.current.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block as any);
        });

        setValue(parseValue(children));
    }, [children]);

    options.wrapper = props => {
        if (!children) return null;

        return (
            <div {...props} className={'markdown' + (stringStartsWithArabic(children) ? ' rtl' : '') + (props.className ? + ' ' + props.className : '')} />
        );
    }

    return (
        <Wrapper ref={rootRef}>
            <BaseMarkdown options={options}>{value}</BaseMarkdown>
        </Wrapper>
    )
}
