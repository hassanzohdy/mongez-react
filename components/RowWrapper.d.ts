import React from 'react';
export interface RowWrapperProps {
    component?: React.FC | React.ComponentClass;
    item: any;
    children: React.ReactNode | React.ReactNode[];
    [key: string]: any;
}
export default function RowWrapper(props: RowWrapperProps): JSX.Element;
