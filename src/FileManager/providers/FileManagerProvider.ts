import React from 'react';
import { SelectedFile } from '../types';

const FileManagerProvider = React.createContext({
    selectingFile: (file: SelectedFile, isSelected: boolean) => { },
    selectedFiles: null,
});

export default FileManagerProvider;
