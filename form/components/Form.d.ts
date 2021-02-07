import '../validation/locales/en';
import '../validation/locales/ar';
import { Arr } from 'reinforcements';
import ReactorComponent from './../../components/ReactorComponent';
export default class Form extends ReactorComponent {
    inputs: any[];
    state: {};
    isValidForm: any;
    isSubmitting: any;
    formElement: any;
    dirtyInputs: Arr<unknown>;
    setInput(input: any): void;
    removeInput(input: any): void;
    /**
     * Convert form to query string
     *
     * @return {string}
     */
    toQueryString(): any;
    /**
     * Convert current form into plain object
     *
     * @returns {object}
     */
    toObject(): any;
    /**
     * Submit form
     */
    triggerSubmit(e: any): void;
    /**
     * Mark the form as valid or not
     *
     * @param {bool} isValidForm
     */
    validForm(isValidForm: any): void;
    /**
     * Change the form submission state
     *
     * @param {boolean} submitting
     */
    submitting(submitting: any): void;
    cleanInput(input: any): void;
    dirtyInput(input: any): void;
    /**
     * Trigger form submission programmatically
     *
     * @returns {void}
     */
    submit(): void;
    /**
     * {@inheritdoc}
     */
    render(): JSX.Element;
}
