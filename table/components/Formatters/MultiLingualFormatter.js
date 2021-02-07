import { Obj } from 'reinforcements';
import Is from '@flk/supportive-is';
import Globals from '../../../globals/index.js';

function MultiLingualFormatter({ column }) {
    const { value } = column;
    if (!value || !Is.object(value))
        return null;
    return Obj.get(value, Globals.localeCode);
}

export default MultiLingualFormatter;
