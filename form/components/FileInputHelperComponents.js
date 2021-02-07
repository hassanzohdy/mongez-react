import { styled } from '@material-ui/core';

const FileInputWrapper = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(1.5)
}));
const FileButtonWrapper = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(1)
}));
const FileButtonText = styled('span')(({ theme }) => ({
    marginLeft: theme.spacing(1)
}));

export { FileButtonText, FileButtonWrapper, FileInputWrapper };
