import { RestfulService } from './../http';

export type SelectedFile = {
    /**
     * File id
     */
    id?: number;
    /**
     * File name only
     */
    name: string;
    /**
     * Relative path for the file
     */
    relativePath: string;
    /**
     * Full url for the file
     */
    url: string;
};

export type FileManagerModalProps = {
    esc?: boolean;
    size?: string;
    backdrop?: boolean;
    fullScreen?: boolean;
};

export type FileManagerProps = {
    /**
     * A flag to detect whether to open the file manager
     */
    open: boolean;
    /**
     * File Manager Service Api
     */
    service?: RestfulService;
    /**
     * Upload name that will be sent to the server
     */
    uploadName?: string;
    /**
     * A callback function is triggered on file manager close
     */
    onClose: (...args: any[]) => void;
    /**
     * A callback function is triggered when file(s) is selected
     */
    onSelect(files: SelectedFile | SelectedFile[]): void;
    /**
     * A callback function is triggered when file(s) is un selected
     * This works only when multiple option is enabled
     */
    onUnSelect?(file: SelectedFile): void;
    /**
     * Allow multiple file selection
     */
    multiple?: boolean;
    /**
     * If a name is passed, then it will be automatically added as hidden input(s) with file relative path
     */
    name?: string;
    /**
     * Modal Title
     */
    title?: React.ReactNode;
    /**
     * Modal Props
     */
    modalProps?: FileManagerModalProps;
};