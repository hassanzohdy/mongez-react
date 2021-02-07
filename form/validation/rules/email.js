import '../../../localization/locales.js';
import { trans } from '../../../localization/translator.js';
import Is from '@flk/supportive-is';

var email = {
    type: 'email',
    rule: 'email',
    evaluate: function (value) {
        return {
            hasError: !Is.email(value),
            errorMessage: trans('validation.email'),
        };
    },
};

export default email;
