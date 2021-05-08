import { trans } from '../../../localization';
import { InputRule, RuleResponse } from './input-rule';

export default {
    rule: 'min',
    requiresValue: true,
    evaluate: function (value, props): RuleResponse {
        const min = props.min;

        return {
            hasError: Number(value) < min,
            errorMessage: trans('validation.min', min),
        } as RuleResponse;
    }
} as InputRule;
