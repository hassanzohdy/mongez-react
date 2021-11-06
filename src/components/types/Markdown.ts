import { MarkdownToJSX } from "markdown-to-jsx";

export type MarkdownProps = {
    /**
     * Component children value
     */
    children?: string;
    /**
     * Options list
     */
    options?: MarkdownToJSX.Options;
};

export type MarkdownConfig = {
    markdown?: {
        /**
         * Run a generic parsing for the passed children value before starting parsing 
         */
        beforeParsing?: (children: string) => string;
        /**
         * Overrides list of components
         */
        overrides?: object;
    }
}