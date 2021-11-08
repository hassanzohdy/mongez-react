import React from "react";
import Is from "@flk/supportive-is";
import { Random } from "reinforcements";
import { FormInput } from "../utils/types";
import { trans } from "../../localization";
import FormContext from "../Context/FormContext";

export default function useFormInput(inputOptions: FormInput, memoChange = []): FormInput {
    const [inputKey] = React.useState(Random.id());

    const { form } = React.useContext(FormContext);

    function prepareFormInput(formInput): FormInput {
        if (!formInput.key) {
            formInput.key = inputKey;
        }

        if (!formInput.markAsClean) {
            formInput.markAsClean = () => {
                formInput.setError(null);
                formInput.state = 'clean';

                form && form.updateInput(formInput);
            };
        }

        if (formInput.required && !formInput.validate) {
            formInput.validate = () => {
                // if (Is.empty(formInput.value)) {
                if (! formInput.value) {
                    return formInput.markAsInvalid('required', trans('validation.required'));
                }

                formInput.markAsClean();
            }
        }

        if (!formInput.requiredValue) {
            formInput.requiredValue = value => {
                // if (!Is.empty(value)) {
                if (value) {
                    formInput.markAsClean();
                } else if (formInput.required) {
                    formInput.markAsInvalid('required', trans('validation.required'));
                }
            }
        }

        if (!formInput.dispatchFromForm) {
            formInput.dispatchFromForm = () => {
                if (!form) return;

                form && form.removeFormInput(formInput);
            }
        }

        if (!formInput.markAsInvalid) {
            formInput.markAsInvalid = (errorType, error) => {
                formInput.state = 'invalid';
                formInput.setError(error);

                formInput.onError && formInput.onError(errorType, error);

                form && form.updateInput(formInput);

                return false;
            };
        }

        return formInput;
    }

    const formInput = React.useMemo(() => prepareFormInput(inputOptions), memoChange);

    // terminate input with clearing the required validation
    React.useEffect(() => {
        return () => formInput.dispatchFromForm();
    }, [formInput]);

    React.useEffect(() => {
        formInput.dispatchFromForm();

        form && form.addFormInput(prepareFormInput(formInput));
    }, [formInput]);

    return formInput;
}
