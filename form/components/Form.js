import { Arr } from 'reinforcements';
import React from 'react';
import FormContext from '../Context/FormContext.js';
import ReactorComponent from '../../components/ReactorComponent.js';
import '../validation/locales/ar.js';
import '../validation/locales/en.js';
import serialize from 'form-serialize';

class Form extends ReactorComponent {
    constructor() {
        super(...arguments);
        this.inputs = [];
        this.state = {};
        this.isValidForm = true;
        this.isSubmitting = false;
        this.formElement = null;
        this.dirtyInputs = new Arr([]);
    }
    setInput(input) {
        if (input.id && this.inputs.find(inp => inp.id === input.id)) {
            let inputIndex = this.inputs.findIndex(inp => inp.id === input.id);
            this.inputs[inputIndex] = input;
            return;
        }
        if (this.inputs.includes(input))
            return;
        this.inputs.push(input);
    }
    removeInput(input) {
        // const inputIndex = this.inputs.findIndex(inp => Object.is(input, inp));
        const inputIndex = this.inputs.findIndex(inp => inp.id === input.id);
        if (inputIndex === -1)
            return;
        this.inputs.splice(inputIndex, 1);
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
     * Submit form
     */
    triggerSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        this.isValidForm = true; // make sure its reset
        this.validForm(true);
        for (let input of this.inputs) {
            if (input.current) {
                input.current.validate(e);
            }
            else {
                input.validate(e);
            }
            if (input.hasError) {
                this.validForm(false);
            }
        }
        // check if the form is valid
        // if not, then do not submit
        if (this.isValidForm === false)
            return;
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
        this.isValidForm = isValidForm;
        this.set('isValidForm', isValidForm);
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
    cleanInput(input) {
        this.dirtyInputs.remove(input);
        setTimeout(() => {
            this.validForm(this.dirtyInputs.isEmpty());
        }, 0);
    }
    dirtyInput(input) {
        this.dirtyInputs.pushOnce(input);
        this.isValidForm = false;
        setTimeout(() => {
            this.forceUpdate();
        }, 0);
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
        let props = {
            ...this.props
        };
        if (props.noValidate === undefined) {
            props.noValidate = true;
        }
        // noValidate disables the browser default validation
        return (React.createElement(FormContext.Provider, { value: { form: this } },
            React.createElement("form", { ref: form => this.formElement = form, className: props.className, noValidate: props.noValidate, onSubmit: this.triggerSubmit.bind(this) }, this.children())));
    }
}

export default Form;
