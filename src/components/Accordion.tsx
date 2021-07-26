import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import BaseAccordion, { AccordionProps } from '@material-ui/core/Accordion';
import { Theme, createStyles, makeStyles, styled } from '@material-ui/core/styles';

const StyledAccordionContent = styled(AccordionDetails)({
    display: 'block',
})

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
        },
        expandedHeading: {
            fontWeight: 'bold',
            // borderBottom: '1px solid #eee',
        }
    }),
);

interface MainAccordionProps extends AccordionProps {
    expandIcon?: React.ReactNode;
    heading?: React.ReactNode;
    children: React.ReactNode;
}

export default function Accordion(props: MainAccordionProps) {
    const classes = useStyles();

    const { expandIcon = <ExpandMoreIcon />, heading, children: content, ...accordionProps } = props;

    return (
        <BaseAccordion {...accordionProps}>
            <AccordionSummary classes={{ expanded: classes.expandedHeading }} expandIcon={expandIcon}>{heading}</AccordionSummary>
            <StyledAccordionContent>{content}</StyledAccordionContent>
        </BaseAccordion>
    )
}