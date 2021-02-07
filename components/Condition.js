import PropTypes from 'prop-types';

function If(props) {
    if ([false, null, undefined].includes(props.condition))
        return null;
    return props.render ? props.render() : props.children;
}
If.propTypes = {
    condition: PropTypes.any.isRequired,
    children: PropTypes.any,
    render: PropTypes.func,
};
function ElseIf(props) {
    if ([false, null, undefined].includes(props.condition))
        return null;
    return props.render ? props.render() : props.children;
}
function Condition(props) {
    for (let child of props.children) {
        if (child.props.condition === true || child.props.condition === undefined) {
            return child.props.children;
        }
    }
}

export default Condition;
export { ElseIf, If };
