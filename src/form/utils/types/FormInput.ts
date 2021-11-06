import { ComponentValidator, InputRule } from "./Validation";

export type FormInputProps = {
    /**
     * Input value
     */
    value: any;
    /**
     * Input name
     * The name is a dot notation based, which means a name like settings.logo will be auto transformed into settings[logo]
     */
    name?: string;
    /**
     * Component key
     */
    key?: string;
    setError?: Function;
    validate?: Function;
    markAsClean?: Function;
    dispatchFromForm?: Function;
    /**
     * Component type
     */
    type?: string;
    /**
     * Determine whether the input is required
     * 
     * @default false
     */
    required?: boolean;
    /**
     * Event triggered when there is a validation error in the component
     */
    onError?: (errorType: string, message: string) => void;
    requiredValue?: (value: any) => void;
    state?: 'clean' | 'invalid';
    markAsInvalid?: (errorType: string, errorMessage: string) => false;
};

export type FormInput2Props = {
    /**
     * Input label
     */
    label?: string;
    /**
     * Label position
     * 
     * @default top
     */
    labelPosition?: 'top' | 'inline';
    /**
     * Determine if the input is read only
     */
    readOnly?: boolean;
    /**
     * Input validation rules list
     */
    rules?: InputRule[];
    /**
     * Input id attribute
     */
    id?: string;
    /**
     * Input name attribute
     */
    name?: string;
    /**
     * Input icon attribute
     */
    icon?: React.ReactNode;
    /**
     * When set to true, the component will interact as controlled/uncontrolled component, otherwise it will be interact as uncontrolled  
     * 
     * @defaults true
     */
    strict?: boolean;
    /**
     * Current themes for the form input
     * 
     * @defaults material
     */
    theme?: InputTheme;
    /**
     * Icon position, works only with when icon prop is passed
     * 
     * @default start
     */
    iconPosition?: 'start' | 'end';
    /**
     * List of available classes
     */
    classes?: {
        /**
         * Error message class
         */
        errorMessage?: string;
        /**
         * Input class
         */
        input?: string;
        /**
         * Label class
         */
        label?: string;
        /**
         * Form Control class
         */
        formControl?: string;
    },
    /**
     * A callback function triggered on validation error
     */
    onError?: (errorMessage: string, errorType: string) => void;
    /**
     * A callback function triggered on input value changes
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, inputValidator: (value: string) => void) => void;
    /**
     * A callback function triggered on input focus out
     */
    onBLur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Other props
     */
    [key: string]: any;
};

export type FormInput2HookProps = {
    /**
     * Input Placeholder
     */
    placeholder: string;
    /**
     * Input label
     */
    label: React.ReactNode;
    /**
     * Label position
     * 
     * @default top
     */
    labelPosition: 'top' | 'inline';
    /**
     * Component required state
     */
    required: boolean;
    /**
     * Determine if the input is read only
     */
    readOnly: boolean;
    /**
     * Input validation rules list
     */
    rules: InputRule[];
    /**
     * Input id attribute
     */
    id: string;
    /**
     * Input value
     */
    value: string;
    /**
     * Input name attribute
     */
    name?: string;
    /**
     * Input icon attribute
     */
    icon?: React.ReactNode;
    /**
     * Current themes for the form input
     * 
     * @defaults material
     */
    theme: InputTheme;
    /**
     * Component error
     */
    error: string | null;
    /**
     * Determine whether input has error
     */
    hasError: boolean;
    /**
     * Icon position, works only with when icon prop is passed
     * 
     * @default start
     */
    iconPosition: 'start' | 'end';
    /**
     * List of available classes
     */
    classes?: {
        /**
         * Error message class
         */
        errorMessage?: string;
        /**
         * Input class
         */
        input?: string;
        /**
         * Label class
         */
        label?: string;
        /**
         * Form Control class
         */
        formControl?: string;
    },
    /**
     * A callback function triggered on input value changes
     */
    onChange: (event: React.ChangeEvent<HTMLInputElement>, setAs?: Function) => void;
    // /**
    //  * Other props
    //  */
    [key: string]: any;
    /**
     * List of other props
     */
    otherProps: any;
};

export type InputTheme = 'material' | 'bootstrap' | 'redit' | 'semantic';

export type HiddenInputProps = {
    /**
     * Input name
     */
    name: string;
    /**
     * Input value
     */
    value: string | string[] | number | number[] | boolean | boolean[] | any;
    /**
     * Any other props
     */
    [id: string]: any;
};


export type FormInputRegistrar = ComponentValidator & {
    /**
     * Input name
     */
    name: string;
}