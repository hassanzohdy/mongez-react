import '../../../localization/locales.js';
import { trans } from '../../../localization/translator.js';

function TranslatorFormatter({ column }) {
    const { value } = column;
    return value ? trans(value) : '';
}

export default TranslatorFormatter;
