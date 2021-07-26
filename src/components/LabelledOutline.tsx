import React from 'react';
import ReactDOM from "react-dom";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";
import NotchedOutline from "@material-ui/core/OutlinedInput/NotchedOutline";

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
    const labelNode: any = ReactDOM.findDOMNode(labelRef.current);
    setLabelWidth(labelNode != null ? labelNode.offsetWidth : 0);
  }, [label]);

  return (
    <div style={{ position: "relative", marginTop: "8px" }}>
      <InputLabel
        ref={labelRef}
        htmlFor={id}
        variant="outlined"
        className={classes.inputLabel}
        shrink
      >
        {label}
      </InputLabel>
      <div className={classes.root}>
        <div id={id} className={classes.content}>
          {children}
          <NotchedOutline notched labelWidth={labelWidth} />
        </div>
      </div>
    </div>
  );
};
export default withStyles((styles as any))(LabelledOutline);
