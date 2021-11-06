import React from 'react';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import Editor, { Plugins } from 'react-markdown-editor-lite';
import Label from '../Label';
import { useClasses } from '../../../hooks';
import style from "./index.module.scss";
import MentionPlugin from './MentionPlugin';
import Link from './../../../components/Link';
import { styled } from '@material-ui/core';
import config from './../../../config';
import InputError from '../InputError';
import { useFormInputRegistrar } from '../../hooks';
import { useError, useId, useLabel, useName, usePlaceholder } from './../../hooks/useFormInputProps';
import { FormContext, rulesList, validateComponent } from '../..';

const markdownLearningUrl = 'https://guides.github.com/features/mastering-markdown/';

export type MarkdownInputProps = {
    /**
     * Markdown input id
     */
    id?: string;
    /**
     * Markdown input name
     */
    name?: string;
    /**
     * Placeholder
     */
    placeholder?: string;
    /**
     * Determine whether current input is required
     */
    required?: boolean;
    /**
     * Input label
     */
    label?: React.ReactNode;
    /**
     * Input Value
     */
    value?: string;
    /**
     * Default value
     */
    defaultValue?: string;
    /**
     * Autofocus on the input
     */
    autoFocus?: boolean;
    /**
     * Enable shortcuts
     */
    shortcuts?: boolean;
    /**
     * Classes list
     */
    classes?: {
        root?: string;
        input?: string;
        label?: string;
        errorMessage?: string;
    };
    /**
     * On change event
     */
    onChange?: (
        data: { text: string, html: string },
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => void;
    /**
     * On input blur
     */
    onBlur?: (e: any) => void;
    /**
     * On mention
     */
    onMention?: (mentionedText: string) => Promise<any>;
    /**
     * List of enabled plugins
     */
    plugins?: string[];
    /**
     * Other props
     */
    [id: string]: any;
}

Editor.use(Plugins.AutoResize, {
    min: 200, // min height
    max: 600, // max height
});

Editor.use(Plugins.TabInsert, {
    /**
     * Number of spaces will be inputted when user type a Tab key. 
     * Especially, note that 1 means a '\t' instead of ' '.
     * Default value is 1.
     */
    tabMapValue: 1,
});

function onImageUpload(file) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = data => {
            resolve(data.target.result);
        };
        reader.readAsDataURL(file);
    });
}

const StyledLink = styled(Link)({
    fontSize: '0.7rem',
    paddingLeft: '0.5rem',
});


const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function MarkdownInput(props: MarkdownInputProps) {
    const [value, setValue] = React.useState(props.defaultValue || props.value || '');
    const [rules] = React.useState(() => props.rules || config.get('form.input.markdown.inputRules', rulesList));

    const [error, setError, hasError] = useError(false);

    const { form } = React.useContext(FormContext);

    function handleEditorChange({ html, text }, e) {
        props.onChange && props.onChange({ text, html }, e);

        if (props.onChange && props.value !== undefined) {
            return;
        }

        setValue(text);

        validateComponent({
            form,
            id,
            rules,
            value: text,
            props,
            setError,
        });
    }

    const [autoFocused, setAutoFocus] = React.useState(props.autoFocus || false);

    React.useEffect(() => {
        if (props.autoFocus === undefined) return;
        setAutoFocus(props.autoFocus);
    }, [props.autoFocus]);

    Editor.use(MentionPlugin, {
        onChange: props.onMention
    });

    const getClass = useClasses(props, {
        input: style.input,
        root: style.root,
    });

    const placeholder = usePlaceholder(props);
    const name = useName(props);
    const id = useId(props);
    const label = useLabel(props);

    const editorRef = React.useRef();

    React.useEffect(() => {
        if (!editorRef.current) return;

        (editorRef.current as any).getMdElement().setSelectionRange(value.length, value.length);
    }, []);

    React.useEffect(() => {
        if (props.value === undefined || value === props.value) return;

        setValue(props.value || '');

        validateComponent({
            form,
            id,
            rules,
            value,
            props,
            setError,
        });
    }, [props.value]);

    useFormInputRegistrar({
        id,
        name,
        rules,
        props,
        value,
        setError,
    });

    if (props.value !== undefined && !props.onChange) {
        throw new Error('Controlled Component must have a `onChange` prop, otherwise use `defaultValue` props instead');
    }

    const rootRef = React.useRef();

    React.useEffect(() => {
        function clickDetection(e) {
            let rootElement = rootRef.current as HTMLElement;
            if (!rootRef.current) return;
            if (document.activeElement === (editorRef.current as any).getMdElement()) return;

            if (rootElement === e.target || rootElement.contains(e.target)) return;
            props.onBlur && props.onBlur(e);
        }
        document.addEventListener('click', clickDetection);
        return () => document.removeEventListener('click', clickDetection);
    }, []);

    return (
        <div
            ref={rootRef}
            className={getClass('root')}
        >
            {label && <Label className={getClass('label')} label={label} htmlFor={id + '_md'} required={props.required} />}
            {hasError && <InputError classes={props.classes} error={error} />}

            <Editor
                markdownClass={getClass('input', 'custom-html-style')}
                renderHTML={text => mdParser.render(text)}
                onChange={handleEditorChange}
                placeholder={placeholder}
                plugins={props.plugins}
                ref={editorRef}
                value={value}
                id={id}
                autoFocus={autoFocused}
                // onBlur={props.onBlur}
                // onImageUpload={onImageUpload}
                // imageAccept="image/*"
                view={{
                    menu: true,
                    md: true,
                    html: false,
                }}
                name={name}
                table={{
                    maxCol: 6,
                    maxRow: 10,
                }}
                shortcuts={props.shortcuts}
            />
            <StyledLink to={markdownLearningUrl} newTab relative={false}>Learn Markdown syntax in 5 minutes.</StyledLink>
        </div>
    )
}

MarkdownInput.defaultProps = {
    shortcuts: true,
    plugins: [
        'mention',
        'header',
        'font-bold',
        'font-italic',
        'font-underline',
        'font-strikethrough',
        'list-unordered',
        'list-ordered',
        'block-quote',
        'block-wrap',
        'block-code-inline',
        'block-code-block',
        'table',
        'image',
        'link',
        'clear',
        'logger',
        'mode-toggle',
        'full-screen',
        'tab-insert'
    ]
};