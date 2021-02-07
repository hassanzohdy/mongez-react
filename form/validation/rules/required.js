import '../../../localization/locales.js';
import { trans } from '../../../localization/translator.js';
import Is from '@flk/supportive-is';

var required = {
    rule: 'required',
    requiresValue: false,
    evaluate: function (value) {
        return {
            hasError: Is.empty(value),
            errorMessage: trans('validation.required'),
        };
    },
};

export default required;
