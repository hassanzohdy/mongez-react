import React from 'react';
interface CardProps {
    number?: number;
    text?: string;
    to?: string;
    icon?: React.ElementType;
    iconColor?: string;
    backgroundColor?: string;
    color?: string;
    className?: string;
}
export default function Card(props: CardProps): JSX.Element;
export declare const RedCard: (props: CardProps) => JSX.Element;
export declare const GreenCard: (props: CardProps) => JSX.Element;
export declare const OrangeCard: (props: CardProps) => JSX.Element;
export declare const BlueCard: (props: CardProps) => JSX.Element;
export {};
