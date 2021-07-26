import React from 'react';

type Form = {
    // onValidate(callback: any): void;
    // clearValidation(callback: any): void;
    [id: string]: any;
};

interface FormOptions {
    form?: Form,
};

const formOptions: FormOptions = {
    form: null
};

const FormContext = React.createContext(formOptions);

export default FormContext;