import Is from "@flk/supportive-is";
import { trans } from './../../../localization';
import { InputRule, RuleResponse } from './input-rule';

export default {
    rule: 'required',
    requiresValue: false,
    evaluate: function (value, props): RuleResponse {
        const { required } = props;

        return {
            errorType: 'required',
            hasError: required === true && Is.empty(value),
            errorMessage: trans('validation.required'),
        } as RuleResponse
    },
} as InputRule;