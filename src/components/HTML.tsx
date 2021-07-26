import React from 'react';
import htmlToText from '../utils/htmlToText';

export type HTMLProps = {
    /**
     * Set html tags as string
     */
    html?: string;
    /**
     * Alias to html prop
     */
    content?: string;
    /**
     * Used if you want to strip off the html tags and display only text
     */
    text?: string;
    /**
     * Rendering component
     * 
     * @default div
     */
    component?: React.FC;
}

export default function HTML(propsList: HTMLProps) {
    const { html = '', content = '', text = '', component: Component = 'div', ...props } = propsList;

    if (text) {
        return <Component>{htmlToText(text)}</Component>
    }

    return <Component {...props} dangerouslySetInnerHTML={{ __html: html || content }} />;
}