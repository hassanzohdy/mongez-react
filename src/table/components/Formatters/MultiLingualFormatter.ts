import { getLocalizedText } from "../../../localization/utils";

export default function MultiLingualFormatter({ column }) {
    const { value } = column;

    return getLocalizedText(value);
}