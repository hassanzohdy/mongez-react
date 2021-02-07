import PropTypes from 'prop-types';
declare function FileInput(props: any): JSX.Element;
declare namespace FileInput {
    var propTypes: {
        label: PropTypes.Requireable<string>;
        id: PropTypes.Requireable<string>;
        name: PropTypes.Requireable<string>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        required: PropTypes.Requireable<boolean>;
        buttonIcon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        buttonText: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        buttonComponent: PropTypes.Requireable<any>;
    };
    var defaultProps: {
        onChange: () => void;
        buttonComponent: (props: any) => JSX.Element;
        buttonIcon: JSX.Element;
        buttonText: string;
    };
}
export default FileInput;
