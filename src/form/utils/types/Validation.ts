import Form from "../../components/Form";

export interface RuleResponse {
    /**
     * Determine if the rule will trigger an error 
     */
    hasError: boolean;
    /**
     * Set the error message that will be triggered if rule has any error
     */
    errorMessage: string;
    /**
     * The error type of the input, i.e minLength, required, email...
     */
    errorType: string;
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
     * @returns {RuleResponse}
     */
    evaluate(value: string, props: any): RuleResponse;
}

export type ComponentValidator = {
    /**
     * Form component
     */
    form?: any;
    /**
     * Current value
     */
    value: string | null | Array<any> | any;
    /**
     * Component Props List
     * 
     * Used in the validator function
     */
    props: any;
    /**
     * The component error state updater
     */
    setError: React.SetStateAction<any>;
    /**
     * Rules list
     */
    rules: InputRule[];
    /**
     * Component id
     */
    id: string;
}