import { trans } from './../../../localization';
import { InputRule, RuleResponse } from './input-rule';

export default {
    rule: 'pattern',
    requiresValue: true,
    evaluate: function (value, props): RuleResponse {
        const { pattern, patternError } = props;
        return {
            hasError: ! pattern.test(value),
            errorMessage: patternError || trans('validation.pattern'),
        } as RuleResponse;
    }
} as InputRule;
