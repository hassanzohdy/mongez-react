import cslx from 'clsx';
import React from 'react';
import '../validation/locales/en';
import '../validation/locales/ar';
import serialize from 'form-serialize';
import FormContext from '../Context/FormContext';
import { getFormInputTheme } from '../utils/flags';
import localization from './../../localization/translator';
import arabicTranslation from './../validation/locales/ar';
import englishTranslation from './../validation/locales/en';
import MongezComponent from './../../components/MongezComponent';
import events, { EventSubscription, EventTriggerResponse } from '../../events';
import { Random } from 'reinforcements';

localization.extend('ar', arabicTranslation);
localization.extend('en', englishTranslation);

export default class Form extends MongezComponent {
    state = {};
    inputs = [];
    formElement = null;
    isValidForm: any = true;
    isSubmitting: any = false;
    validationCallbacks = [];
    formInputs = {};
    // formId = ;
    public formEventName = `form.${Random.id()}`;

    public eventName(eventName) {
        return this.formEventName + '.' + eventName;
    }

    public onValidation(callback) {

    }

    addFormInput(formInput) {
        this.formInputs[formInput.id] = formInput;
    }

    removeFormInput(inputId) {
        delete this.formInputs[inputId];
    }

    public validateInput(inputId: string, isValid: boolean) {
        if (!this.formInputs[inputId]) return;

        this.formInputs[inputId]['isValid'] = isValid;

        let isValidForm = true;

        for (let id in this.formInputs) {
            let input = this.formInputs[id];
            if (input.isValid === false) {
                isValidForm = false;
                break;
            }
        }

        this.validForm(isValidForm);
    }

    /**
     * Add callback on form validation
     * 
     * @param {Function} callback
     * @returns {EventSubscription}
     */
    public onValidate(callback: Function): EventSubscription {
        return events.subscribe(this.eventName('validation'), callback);
    }

    /**
     * Submit form
     */
    triggerSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        this.validForm(true); // make sure its reset

        let output = events.triggerAll(this.eventName('validation'), this) as EventTriggerResponse;

        if (output.results.includes(false)) {
            this.validForm(false);
            return;
        }

        if (this.props.onSubmit) {
            this.submitting(true);
            this.props.onSubmit(e, this);
        }
    }

    /**
     * Mark the form as valid or not
     * 
     * @param {bool} isValidForm 
     */
    validForm(isValidForm) {
        if (isValidForm === this.isValidForm) return;

        this.isValidForm = isValidForm;
        this.set('isValidForm', isValidForm);
    }

    /**
     * Convert form to query string
     * 
     * @return {string} 
     */
    toQueryString() {
        return serialize(this.formElement);
    }

    /**
     * Convert current form into plain object
     * 
     * @returns {object} 
     */
    toObject() {
        return serialize(this.formElement, true);
    }

    /**
     * Change the form submission state 
     *  
     * @param {boolean} submitting 
     */
    submitting(submitting) {
        this.isSubmitting = submitting;
        this.set('isSubmitting', submitting);
    }

    /**
     * Trigger form submission programmatically
     * 
     * @returns {void} 
     */
    submit() {
        this.formElement.requestSubmit();
    }

    /**
     * {@inheritdoc}
     */
    render() {
        let props: any = {
            ...this.props
        };

        if (props.noValidate === undefined) {
            props.noValidate = true;
        }

        const classes = cslx(props.className, getFormInputTheme());

        // noValidate disables the browser default validation
        return (
            <FormContext.Provider value={{ form: this }}>
                <form ref={form => this.formElement = form} className={classes} noValidate={props.noValidate} onSubmit={this.triggerSubmit.bind(this)}>
                    {this.children()}
                </form>
            </FormContext.Provider>
        );
    }
}