import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import NotchedOutline from '@material-ui/core/OutlinedInput/NotchedOutline';

const styles = {
    root: {
        position: "relative"
    },
    content: {
        padding: "18.5px 14px"
    },
    inputLabel: {
        position: "absolute",
        left: 0,
        top: 0,
        // slight alteration to spec spacing to match visual spec result
        transform: "translate(0, 24px) scale(1)"
    }
};
const LabelledOutline = ({ classes, id, label, children }) => {
    const [labelWidth, setLabelWidth] = React.useState(0);
    const labelRef = React.useRef(null);
    React.useEffect(() => {
        const labelNode = ReactDOM.findDOMNode(labelRef.current);
        setLabelWidth(labelNode != null ? labelNode.offsetWidth : 0);
    }, [label]);
    return (React.createElement("div", { style: { position: "relative", marginTop: "8px" } },
        React.createElement(InputLabel, { ref: labelRef, htmlFor: id, variant: "outlined", className: classes.inputLabel, shrink: true }, label),
        React.createElement("div", { className: classes.root },
            React.createElement("div", { id: id, className: classes.content },
                children,
                React.createElement(NotchedOutline, { notched: true, labelWidth: labelWidth })))));
};
var LabelledOutline$1 = withStyles(styles)(LabelledOutline);

export default LabelledOutline$1;
