import { trans } from '../../../localization';
import { InputRule, RuleResponse } from './input-rule';

export default {
    rule: 'max',
    requiresValue: true,
    evaluate: function (value, props): RuleResponse {
        const max = props.max;
        return {
            hasError: Number(value) > max,
            errorMessage: trans('validation.max', max),
        } as RuleResponse;
    }
} as InputRule;
