import '../../../localization/locales.js';
import { trans } from '../../../localization/translator.js';

var minLength = {
    rule: 'minLength',
    evaluate: function (value, props) {
        const minLength = props.minLength;
        return {
            hasError: String(value).length < minLength,
            errorMessage: trans('validation.minLength', minLength),
        };
    }
};

export default minLength;
