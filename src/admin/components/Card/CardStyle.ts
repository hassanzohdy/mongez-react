import { styled } from '@material-ui/core';

export const CardContainer = styled('div')({
    boxShadow: '2px 2px 10px #DADADA',
    margin: '5px',
    padding: '20px',
    borderRadius: '5px',
    transition: '.3s linear all',
    position: 'relative',
    fontWeight: 'bold',
});

export const DataContainer = styled('div')({
    fontSize: '1.6rem',
});

export const NumberCounter = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(1.5)
}));

export const CardText = styled('div')({
    fontSize: '1rem'
});