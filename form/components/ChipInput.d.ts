import { PropTypes } from '@material-ui/core';
interface ChipProps {
    value?: string[];
    onChange?: Function;
    name?: string;
    placeholder?: string;
    label?: string;
    margin?: PropTypes.Margin;
}
export default function ChipInput(props: ChipProps): JSX.Element;
export {};
