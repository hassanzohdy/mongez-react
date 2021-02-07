import PropTypes from 'prop-types';
declare function FormError({ error, heading }: {
    error: any;
    heading?: any;
}): JSX.Element;
declare namespace FormError {
    var propTypes: {
        heading: PropTypes.Requireable<string>;
        error: PropTypes.Requireable<string | object>;
    };
}
export default FormError;
