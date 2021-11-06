import Is from "@flk/supportive-is";
import { ComponentValidator, InputRule, RuleResponse } from "./types";

export function validationPasses(): RuleResponse {
    return {
        hasError: false,
        errorType: null,
        errorMessage: null,
    } as RuleResponse;
}

export function validate(value, props, rules: InputRule[]): RuleResponse {
    if (!Is.empty(rules)) validationPasses();

    for (let inputRule of rules) {
        // Get rule options list
        // requiresValue: requires value before evaluating the rule
        // type: requires a certain type before evaluating the rule
        // evaluate: the  rule evaluation function 
        const { requiresValue = true, type, rule, evaluate } = inputRule;

        //  if the requires value is set to true and there is no value
        // then skip the rule
        if (requiresValue && !value) continue;

        // If the rule requires certain input type and 
        // the input type is not the same, then skip the rule
        if (type && type !== props.type) continue;

        // if the rule is not listed in the input props, then skip the rule evaluation
        // if (props[rule] === undefined && type !== props.type) continue;
        if (props[rule] === undefined && ! type) continue;
        // if (props[rule] === undefined) continue;

        // Finally, evaluate the input against the rule
        const ruleResponse = evaluate(value, props);

        if (ruleResponse.hasError) {
            return ruleResponse;
        }
    }

    return validationPasses();
};

export function validateComponent({
    value,
    form,
    props,
    setError,
    rules,
    id,
}: ComponentValidator): RuleResponse {
    const validationResult = validate(value, props, rules);

    if (validationResult.hasError) {
        setError(validationResult.errorMessage);
        props.onError && props.onError(validationResult.errorMessage, validationResult.errorType);

        form && form.validateInput(id, false);
    } else {
        form && form.validateInput(id, true);
        setError(null);
    }

    return validationResult;
}