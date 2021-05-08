import Is from "@flk/supportive-is";
import { trans } from './../../../localization';
import { InputRule, RuleResponse } from './input-rule';

export default {
    rule: 'required',
    requiresValue: false,
    evaluate: function (value, props): RuleResponse {
        const { required } = props;

        return {
            hasError: required === true && Is.empty(value),
            errorMessage: trans('validation.required'),
        } as RuleResponse
    },
} as InputRule;