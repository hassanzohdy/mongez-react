import PropTypes from 'prop-types';
declare function FormModal(props: any): JSX.Element;
declare namespace FormModal {
    var propTypes: {
        esc: PropTypes.Validator<boolean>;
        open: PropTypes.Validator<boolean>;
        size: PropTypes.Validator<string>;
        title: PropTypes.Validator<string>;
        onClose: PropTypes.Validator<(...args: any[]) => any>;
        children: PropTypes.Validator<any>;
        backdrop: PropTypes.Validator<boolean>;
        onSubmit: PropTypes.Validator<(...args: any[]) => any>;
        fullScreen: PropTypes.Validator<boolean>;
    };
    var defaultProps: {
        size: string;
        esc: boolean;
        backdrop: boolean;
        fullScreen: boolean;
    };
}
export default FormModal;
