import PropTypes from 'prop-types';
declare function CheckboxGroup({ label, row, children }: {
    label: any;
    row: any;
    children: any;
}): JSX.Element;
declare namespace CheckboxGroup {
    var propTypes: {
        label: PropTypes.Validator<string>;
        row: PropTypes.Requireable<boolean>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    var defaultProps: {
        row: boolean;
    };
}
export default CheckboxGroup;
