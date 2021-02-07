import PropTypes from 'prop-types';
export declare function If(props: any): any;
export declare namespace If {
    var propTypes: {
        condition: PropTypes.Validator<any>;
        children: PropTypes.Requireable<any>;
        render: PropTypes.Requireable<(...args: any[]) => any>;
    };
}
export declare function ElseIf(props: any): any;
export default function Condition(props: any): any;
