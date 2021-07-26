import { trans } from "../../../localization";

export default function TranslatorFormatter({ column }) {
    const { value } = column;

    return value ? trans(value) : '';
}