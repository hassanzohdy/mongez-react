import PropTypes from 'prop-types';
declare function StaticButton(props: any): JSX.Element;
declare namespace StaticButton {
    var propTypes: {
        onClick: PropTypes.Validator<(...args: any[]) => any>;
    };
}
export default StaticButton;
export declare const PrimaryButton: (props: any) => JSX.Element;
export declare const SecondaryButton: (props: any) => JSX.Element;
export declare const DefaultButton: (props: any) => JSX.Element;
