import { trans } from './../../../localization';
import { InputRule, RuleResponse } from './input-rule';

export default {
    rule: 'minLength',
    requiresValue: true,
    evaluate: function (value, props): RuleResponse {
        const minLength = props.minLength;

        return {
            errorType: 'minLength',
            hasError: String(value).length < minLength,
            errorMessage: trans('validation.minLength', minLength),
        } as RuleResponse;
    }
} as InputRule;
