import React from "react";
import "../validation/locales/en";
import "../validation/locales/ar";
import serialize from "form-serialize";
import { FormInput } from "../utils/types";
import FormContext from "../Context/FormContext";
import MongezComponent from "./../../components/MongezComponent";
import arabicTranslation from "./../validation/locales/ar";
import englishTranslation from "./../validation/locales/en";

import localization from "./../../localization/translator";

localization.extend("ar", arabicTranslation);
localization.extend("en", englishTranslation);

export default class Form extends MongezComponent {
  state = {};
  inputs = [];
  formElement = null;
  isValidForm: any = true;
  isSubmitting: any = false;
  validationCallbacks = [];
  formInputs = {};

  addFormInput(formInput: FormInput) {
    this.formInputs[formInput.key] = formInput;
  }

  removeFormInput(formInput: FormInput) {
    delete this.formInputs[formInput.key];

    this.validate();
  }

  /**
   * Submit form
   */
  triggerSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    this.validForm(true); // make sure its reset

    for (let key in this.formInputs) {
      let input = this.formInputs[key];

      if (!input.validate) continue;

      if (input.validate() === false) {
        this.validForm(false);
      }
    }

    // check if the form is valid
    // if not, then do not submit
    if (this.isValidForm === false) return;

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
    this.set("isValidForm", isValidForm);
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
    this.set("isSubmitting", submitting);
  }

  updateInput(input) {
    this.formInputs[input.key] = input;

    this.validate();
  }

  /**
   * Validate Form Inputs
   *
   * @param any input
   */
  validate() {
    let isValidForm = true;

    for (let key in this.formInputs) {
      let input = this.formInputs[key];

      if (input.state === "invalid") {
        isValidForm = false;
        break;
      }
    }

    this.validForm(isValidForm);
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
      ...this.props,
    };

    if (props.noValidate === undefined) {
      props.noValidate = true;
    }

    // noValidate disables the browser default validation
    return (
      <FormContext.Provider value={{ form: this }}>
        <form
          ref={(form) => (this.formElement = form)}
          className={props.className}
          noValidate={props.noValidate}
          onSubmit={this.triggerSubmit.bind(this)}
        >
          {this.children()}
        </form>
      </FormContext.Provider>
    );
  }
}
