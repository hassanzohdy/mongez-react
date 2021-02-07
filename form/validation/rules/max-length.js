import '../../../localization/locales.js';
import { trans } from '../../../localization/translator.js';

var maxLength = {
    rule: 'maxLength',
    evaluate: function (value, props) {
        const minLength = props.minLength;
        return {
            hasError: String(value).length > minLength,
            errorMessage: trans('validation.maxLength', minLength),
        };
    }
};

export default maxLength;
