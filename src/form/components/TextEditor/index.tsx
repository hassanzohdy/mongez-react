import "./style.css";
import React from "react";
import Label from './../Label';
import Is from "@flk/supportive-is";
import config from "../../../config";
import initConfig from "./initConfig";
import Globals from "../../../globals";
import { toInputName } from 'reinforcements';
import { trans } from "../../../localization";
import { Editor } from "@tinymce/tinymce-react";
import { usePropDetector } from "../../../hooks";
import useFormInput from "../../hooks/useFormInput";
import { FormHelperText } from "@material-ui/core";

interface TextEditorProps {
  localeCode?: string;
  direction?: 'ltr' | 'rtl';
  apiKey?: string;
  value?: string;
  strict?: boolean;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  inline?: boolean;
  autoFocus?: boolean;
  defaultValue?: string;
  onChange?: Function;
  placeholder?: React.ReactNode;
  outputFormat?: "html" | "text";
  label?: React.ReactNode;
  /**
   * A callback function triggered on validation error
   */
  onError?: (errorType: string, errorMessage: string) => void;
}

export default function TextEditor({
  localeCode = Globals.localeCode,
  direction = Globals.direction,
  apiKey = "",
  disabled = false,
  inline = false,
  name = null,
  value,
  strict = config.get('form.input.strict', true),
  placeholder = null,
  defaultValue = null,
  label = null,
  autoFocus = false,
  required = false,
  onError = (errorType, errorMessage) => { },
  outputFormat = "html",
  onChange = (value) => { },
}: TextEditorProps) {
  const uploader: any = React.useRef(null);
  const editorRef: any = React.useRef(null);

  const [labelAndPlaceholder] = React.useState(() => {
    const isLabelAndPlaceholderInterchangeable = config.get('form.input.interchangeableLabelPlaceholder');

    let editorLabel = (isLabelAndPlaceholderInterchangeable === true ? (label || placeholder) : label);

    let editorPlaceholder = placeholder;

    if (name) {
      name = toInputName(name);
    }

    if (Is.string(editorLabel)) {
      editorLabel = trans(editorLabel as string);
    }

    if (isLabelAndPlaceholderInterchangeable && !editorPlaceholder) {
      editorPlaceholder = editorLabel;
    } else if (Is.string(editorPlaceholder)) {
      editorPlaceholder = trans(editorPlaceholder as string);
    }

    return {
      label: editorLabel,
      placeholder: editorPlaceholder,
    }
  });

  const [isRequired, setRequiredState] = React.useState<boolean>(Boolean(required));

  usePropDetector(setRequiredState, required);

  const [error, setError] = React.useState('');

  const [internalValue, setValue] = React.useState(value);

  const formInput = useFormInput({
    name,
    value: internalValue,
    setError,
    onError,
    required: isRequired,
  }, [internalValue]);

  const updateValue = value => {
    // allow autofocus and set the pointer at the end of the text
    const editor = editorRef.current;
    editor.selection.select(editor.getBody(), true);
    editor.selection.collapse(false);
    formInput.requiredValue(value);

    onChange(value);

    if (strict === false) {
      setValue(value);
    }
  }

  const hasError = Boolean(error);

  return (
    <>
      {
        labelAndPlaceholder.label &&
        <Label required={isRequired} label={labelAndPlaceholder.label} />
      }
      <Editor
        ref={editorRef}
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        inline={inline}
        apiKey={apiKey}
        initialValue={defaultValue}
        disabled={disabled}
        textareaName={toInputName(name)}
        outputFormat={outputFormat}
        value={value}
        onEditorChange={updateValue}
        init={{
          ...initConfig,
          auto_focus: autoFocus || 'false',
          directionality: direction,
          language: localeCode,
          a11y_advanced_options: true,
          placeholder: labelAndPlaceholder.placeholder as string,
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "image video",
          file_picker_callback: function (cb) {
            uploader.current.onchange = (event: any) => {
              const file = event.target.files[0];

              const reader: any = new FileReader();
              reader.onload = () => {
                const id = "blobid" + new Date().getTime();
                const blobCache = editorRef.current.editorUpload.blobCache;
                const base64 = reader.result.split(",")[1];
                const blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
                /* call the callback and populate the Title field with the file name */
                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };
            uploader.current.click();
          },
        }}
      />
      <input
        type="file"
        name="file"
        ref={uploader}
        className="editor-uploader"
      />
      <FormHelperText error={hasError}>{error}</FormHelperText>
    </>
  );
}
