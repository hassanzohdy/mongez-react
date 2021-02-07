import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import withInputType from '../utils/withInputType.js';

const EmailInput = withInputType('email', {
    name: 'email',
    placeholder: trans('email'),
});

export default EmailInput;
