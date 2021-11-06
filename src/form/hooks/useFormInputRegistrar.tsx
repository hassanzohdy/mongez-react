import React from 'react';
import FormContext from '../Context/FormContext';
import { FormInputRegistrar } from '../utils/types';
import { validateComponent } from '../utils/validator';

export default function useFormInputRegistrar({
    id,
    name,
    rules,
    props,
    value,
    setError,
}: FormInputRegistrar) {
    const { form } = React.useContext(FormContext);

    React.useEffect(() => {
        if (!form) return;

        form.addFormInput({
            id,
            isValid: true,
            name,
            value
        });

        const eventSubscription = form.onValidate(() => {
            const validationResult = validateComponent({
                form,
                id,
                rules,
                value,
                props,
                setError,
            });

            return validationResult.hasError === false;
        });
        return () => {
            eventSubscription.unsubscribe();

            form.removeFormInput(id);
        };
    }, [value]);
}