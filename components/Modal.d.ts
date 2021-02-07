import PropTypes from 'prop-types';
declare function Modal(props: any): JSX.Element;
declare namespace Modal {
    var propTypes: {
        plain: PropTypes.Requireable<boolean>;
        esc: PropTypes.Validator<boolean>;
        open: PropTypes.Validator<boolean>;
        size: PropTypes.Validator<string>;
        title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        onClose: PropTypes.Validator<(...args: any[]) => any>;
        children: PropTypes.Validator<any>;
        backdrop: PropTypes.Validator<boolean>;
        fullScreen: PropTypes.Validator<boolean>;
    };
    var defaultProps: {
        size: string;
        plain: boolean;
        esc: boolean;
        backdrop: boolean;
        fullScreen: boolean;
    };
}
export default Modal;
