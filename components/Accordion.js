import React from 'react';
import { styled, makeStyles, createStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import BaseAccordion from '@material-ui/core/Accordion';

const StyledAccordionContent = styled(AccordionDetails)({
    display: 'block',
});
const useStyles = makeStyles((theme) => createStyles({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    expandedHeading: {
        fontWeight: 'bold',
    }
}));
function Accordion(props) {
    const classes = useStyles();
    const { expandIcon = React.createElement(ExpandMoreIcon, null), heading, children: content, ...accordionProps } = props;
    return (React.createElement(BaseAccordion, Object.assign({}, accordionProps),
        React.createElement(AccordionSummary, { classes: { expanded: classes.expandedHeading }, expandIcon: expandIcon }, heading),
        React.createElement(StyledAccordionContent, null, content)));
}

export default Accordion;
