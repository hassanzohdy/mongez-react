// providers
export { default as FormContext } from "./Context/FormContext";

// hooks 
export { default as useFormInput } from './hooks/useFormInput';
export { default as useInputValue } from './hooks/useInputValue';

// validation rules
export { default as minValidator } from "./validation/rules/min";
export { default as maxValidator } from "./validation/rules/max";
export { default as matchValidator } from "./validation/rules/match";
export { default as emailValidator } from "./validation/rules/email";
export { default as urlValidator } from "./validation/rules/url";
export { default as patternValidator } from "./validation/rules/pattern";
export { default as requiredValidator } from "./validation/rules/required";
export { default as minLengthValidator } from "./validation/rules/min-length";
export { default as maxLengthValidator } from "./validation/rules/max-length";

// utils
export { default as DataForm } from './utils/DataForm';
export { DISABLE_INPUT_CHANGE, getFormInputTheme } from "./utils/flags";
export { validationPasses, validate, validateComponent } from './utils/validator';
export { default as rulesList, autoCompleteRules, fileInputRules } from "./utils/rules-list";

// components
export { default as Form } from "./components/Form";
export { default as Label } from "./components/Label";
export { default as Checkbox } from "./components/Checkbox";
export { default as TextInput } from "./components/TextInput";
export { default as ChipInput } from "./components/ChipInput";
export { default as FormError } from "./components/FormError";
export { default as FileInput } from "./components/FileInput";
export { default as FormInput } from "./components/FormInput";
export { default as FormModal } from "./components/FormModal";
export { default as ImageInput } from "./components/ImageInput";
export { default as EmailInput } from "./components/EmailInput";
export { default as UrlInput } from "./components/UrlInput";
export { default as ColorInput } from "./components/ColorInput";
export { default as DatePicker } from "./components/DatePicker";
export { default as SelectInput } from "./components/SelectInput";
export { default as HiddenInput } from "./components/HiddenInput";
export { default as NumberInput } from "./components/NumberInput";
export { default as MarkdownInput } from "./components/MarkdownInput";
export { default as InlineInput } from "./components/InlineInput";
export { default as AutoComplete } from "./components/AutoComplete";
export { default as SubmitButton } from "./components/SubmitButton";
export { default as withCheckbox } from "./components/withCheckbox";
export { default as TextAreaInput } from "./components/TextAreaInput";
export { default as PasswordInput } from "./components/PasswordInput";
export { default as CheckboxGroup } from "./components/CheckboxGroup";
export { default as RichTextInput } from "./components/RichTextInput";
export { default as MultiLingualInput } from "./components/MultiLingualInput";
export { PrimaryButton, SecondaryButton, DefaultButton } from './components/StaticButton';
export { default as SwitchButton, AlignedSwitchButton, IOSSwitchButton, coloredIOSSwitchButton } from './components/SwitchButton';

// types
export type {
    FormConfigSettings,
    ComponentValidator,
    RuleResponse, InputRule,
    FormInputProps, InputTheme, HiddenInputProps,
    AutoCompleteOption, GuessableAutoCompleteOption, AutoCompleteProps, AutoCompleteHook
}
    from './utils/types';