import React from 'react';
import { AccordionProps } from '@material-ui/core/Accordion';
interface MainAccordionProps extends AccordionProps {
    expandIcon?: React.ReactNode;
    heading?: React.ReactNode;
    children: React.ReactNode;
}
export default function Accordion(props: MainAccordionProps): JSX.Element;
export {};
