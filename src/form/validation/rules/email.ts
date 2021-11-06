import Is from "@flk/supportive-is";
import { trans } from './../../../localization';
import { InputRule, RuleResponse } from './../../utils/types';;

export default {
    type: 'email',
    rule: 'email',
    requiresValue: true,
    evaluate: function (value: string): RuleResponse {
        return {
            hasError: ! Is.email(value),
            errorMessage: trans('validation.email'),
            errorType: 'email',
        } as RuleResponse;
    },
} as InputRule;