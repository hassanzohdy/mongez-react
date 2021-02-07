import PropTypes from 'prop-types';
declare function ScrollTo(props: any): JSX.Element;
declare namespace ScrollTo {
    var propTypes: {
        id: PropTypes.Validator<string>;
        children: PropTypes.Validator<any>;
        component: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    var defaultProps: {
        component: string;
    };
}
export default ScrollTo;
