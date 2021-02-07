import PropTypes from 'prop-types';
declare function RadioGroup({ value, defaultValue, onChange, inputs, row, label, name, children }: {
    value: any;
    defaultValue: any;
    onChange: any;
    inputs: any;
    row: any;
    label: any;
    name: any;
    children: any;
}): JSX.Element;
declare namespace RadioGroup {
    var propTypes: {
        name: PropTypes.Validator<string>;
        inputs: PropTypes.Validator<any[]>;
        row: PropTypes.Validator<boolean>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
    };
    var defaultProps: {
        row: boolean;
        onChange: () => void;
    };
}
export default RadioGroup;
