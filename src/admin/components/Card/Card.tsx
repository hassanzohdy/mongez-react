import React from 'react';
import { Link } from './../../../components';
import { Box, styled } from '@material-ui/core';
import { red, green, orange, blue } from '@material-ui/core/colors';
import { CardContainer, DataContainer, CardText, NumberCounter } from './CardStyle';

const Anchor = styled(Link)({
    textDecoration: 'none',
});

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

export default function Card(props: CardProps) {
    const { number, text, to, icon: Icon, iconColor, backgroundColor, color, className } = props;
    let Wrapper = to ? Anchor : React.Fragment;

    const wrapperProps: any = {};

    if (to) {
        wrapperProps.to = to;
    }

    return (
        <Wrapper {...wrapperProps}>
            <CardContainer style={{ backgroundColor, color }} className={className}>
                <Box display="flex">
                    <Box width="100%">
                        <DataContainer>
                            <NumberCounter>{Number(number).toLocaleString()}</NumberCounter>
                            <CardText>{text}</CardText>
                        </DataContainer>
                    </Box>
                    <Box flexShrink={1}>
                        <Icon style={{ fill: iconColor, fontSize: '3rem' }} />
                    </Box>
                </Box>
            </CardContainer>
        </Wrapper>
    )
}


// export const RedCard = styled(Card)({
//     backgroundColor: red[400],
//     color: '#FFF',
//     '&:hover': {
//         backgroundColor: red[600],
//     }
// });

export const RedCard = (props: CardProps) => <Card backgroundColor={red[400]} color="#FFF" iconColor={red[100]} {...props} />
export const GreenCard = (props: CardProps) => <Card backgroundColor={green[400]} color="#FFF" iconColor={green[100]} {...props} />
export const OrangeCard = (props: CardProps) => <Card backgroundColor={orange[400]} color="#FFF" iconColor={orange[100]} {...props} />
export const BlueCard = (props: CardProps) => <Card backgroundColor={blue[400]} color="#FFF" iconColor={blue[100]} {...props} />