import { InputRule } from "../validation/rules/input-rule";

export type FormInput = {
    value: any;
    name?: string;
    key?: string;
    setError?: Function;
    validate?: Function;
    markAsClean?: Function;
    dispatchFromForm?: Function;
    required?: boolean;
    requiredValue?: (value: any) => void;
    state?: 'clean' | 'invalid';
    markAsInvalid?: (error: string) => false;
};

export type FormConfigSettings = {
    form?: {
        imageInput?: {
            /**
             * Image Input Placeholder Url for ImageInput Component
             */
            placeholder?: string;
        },
        input?: {
            /**
             * Form Input Style 
             * 
             * Default outlined
             * @see https://material-ui.com/api/text-field/#component-name
             */
            variant?: 'outlined' | 'standard' | 'filled';
            /**
             * Set rules list for input validation
             */
            rulesList?: Array<InputRule>;
        }
    }
}