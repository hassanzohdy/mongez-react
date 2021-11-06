import Is from "@flk/supportive-is";
import { trans } from '../../../localization';
import { InputRule, RuleResponse } from '../../utils/types';;

export default {
    type: 'url',
    rule: 'url',
    requiresValue: true,
    evaluate: function (value: string): RuleResponse {
        return {
            hasError: ! Is.url(value),
            errorMessage: trans('validation.url'),
            errorType: 'url',
        } as RuleResponse;
    },
} as InputRule;