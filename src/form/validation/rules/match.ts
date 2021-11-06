import { trans } from '../../../localization';
import { InputRule, RuleResponse } from './../../utils/types';;

export default {
    rule: 'match',
    requiresValue: false,
    evaluate: function (value: string, props): RuleResponse {
        const { match: matchingInputId, matchText } = props;
        const matchingInput = document.getElementById(matchingInputId) as HTMLInputElement;

        return {
            errorType: 'match',
            hasError: matchingInput && matchingInput.value !== String(value),
            errorMessage: trans('validation.match', trans(matchText || matchingInputId)),
        } as RuleResponse;
    },
} as InputRule;