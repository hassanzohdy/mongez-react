import React from 'react';
export declare type DeleteRowButtonProps = {
    open: boolean;
    index: number;
    items: any[];
    iconColor?: string;
    icon?: React.ReactNode;
    tooltip?: string;
    marginTop?: string | number;
    setItems: Function;
};
export default function DeleteRowButton({ marginTop, tooltip, icon: Icon, iconColor, open, index, items, setItems }: DeleteRowButtonProps): JSX.Element;
