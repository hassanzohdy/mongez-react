import './index.scss';
import PropTypes from 'prop-types';
declare function Spinner({ className, theme, color }: {
    className: any;
    theme?: string;
    color: any;
}): JSX.Element;
declare namespace Spinner {
    var propTypes: {
        theme: PropTypes.Requireable<string>;
    };
}
export default Spinner;
