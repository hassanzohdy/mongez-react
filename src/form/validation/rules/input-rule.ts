import { SyntheticEvent } from "react";

export interface RuleResponse {
    /**
     * Determine if the rule will trigger an error 
     */
    hasError: boolean;
    /**
     * Set the error message that will be triggered if rule has any error
     */
    errorMessage: string;
}

export interface InputRule {
    /**
     * The validation rule name that will be used in the input
     */
    rule: string;
    /**
     * If the type is set, then this rule will run only with the set rule
     */
    type?: string;
    /**
     * If set to true, the rule will not be evaluated until there is a value in the input 
     */
    requiresValue?: boolean;
    /**
     * Evaluate the rule against the given input value
     *  
     * @param   {string} value 
     * @param   {object} props 
     * @param   {SyntheticEvent} event
     * @returns {RuleResponse}
     */
    evaluate(value: string, props: any, event: SyntheticEvent): RuleResponse;
}