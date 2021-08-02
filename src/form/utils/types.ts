import { InputRule } from "../validation/rules/input-rule";

export type FormInput = {
    value: any;
    name?: string;
    key?: string;
    setError?: Function;
    validate?: Function;
    markAsClean?: Function;
    dispatchFromForm?: Function;
    type?: string;
    required?: boolean;
    onError?: (errorType: string, message: string) => void;
    requiredValue?: (value: any) => void;
    state?: 'clean' | 'invalid';
    markAsInvalid?: (errorType: string, errorMessage: string) => false;
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
             * When set to true, the component will interact as controlled/uncontrolled component, otherwise it will be interact as uncontrolled  
             * 
             * @defaults true
             */
            strict?: boolean;
            /**
             * Form Input Style 
             * 
             * Default outlined
             * @see https://material-ui.com/api/text-field/#component-name
             */
            variant?: 'outlined' | 'standard' | 'filled';
            /**
             * input Style
             */
            theme?: 'material' | 'bootstrap' | 'redit';
            /**
             * Set rules list for input validation
             */
            rulesList?: Array<InputRule>;
            /**
             * If set to true and the label is not set but only the placeholder
             * the label value will be the placeholder value
             * And vice versa
             * 
             * @default false
             */
            interchangeableLabelPlaceholder?: boolean;
            /**
             * Base classes for input
             */
            classes?: {
                errorMessage?: string;
                input?: string;
                label?: string;
                formControl?: string;
            }
        },
        checkbox?: {
            /**
             * Set the unchecked value for the checkbox
             * when it is not checked
             * 
             * Set it to null, undefined or empty string '' to disable it
             * 
             * Default: 0
             */
            uncheckedValue?: any,
        },
    }
}