export default function withInputType(type: any, defaultProps?: {}): {
    (props: any): JSX.Element;
    defaultProps: {};
};
