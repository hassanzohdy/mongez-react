import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import withInputType from '../utils/withInputType.js';

const PasswordInput = withInputType('password', {
    name: 'password',
    placeholder: trans('password'),
});

export default PasswordInput;
