import Is from "@flk/supportive-is";
import React from "react";
import { Random } from "reinforcements";
import { trans } from "../../localization";
import FormContext from "../Context/FormContext";
import { FormInput } from "../utils/types";

export default function useFormInput(inputOptions: FormInput, memoChange = []): FormInput {
    const [inputKey] = React.useState(Random.id());

    const { form } = React.useContext(FormContext)

    const formInput = React.useMemo(() => inputOptions, memoChange);

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
            if (Is.empty(formInput.value)) {
                return formInput.markAsInvalid(trans('validation.required'));
            }

            formInput.markAsClean();
        }
    }

    if (!formInput.requiredValue) {
        formInput.requiredValue = value => {            
            if (! Is.empty(value)) {
                formInput.markAsClean();
            } else if (formInput.required) {
                formInput.markAsInvalid(trans('validation.required'));
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
        formInput.markAsInvalid = error => {
            formInput.state = 'invalid';
            formInput.setError(error);

            form && form.updateInput(formInput);

            return false;
        };
    }

    // terminate input with clearing the required validation
    React.useEffect(() => {
        return () => formInput.dispatchFromForm();
    }, [formInput]);

    React.useEffect(() => {
        form && form.addFormInput(formInput);
    }, [form, formInput, formInput.value]);

    return formInput;
}
