import "./style.scss";
import React from "react";
import Label from './../Label';
import initConfig from "./initConfig";
import Globals from "../../../globals";
import InputError from "../InputError";
import { Editor } from "@tinymce/tinymce-react";
import useFormInput2 from "../../hooks/useFormInput2";
import { FormInput2Props } from "../../utils/types/FormInput";

export type TextEditorProps = FormInput2Props & {
  localeCode?: string;
  direction?: 'ltr' | 'rtl';
  apiKey?: string;
  inline?: boolean;
  outputFormat?: "html" | "text";
}

export default function TextEditor(props: TextEditorProps) {
  const uploader: any = React.useRef(null);
  const editorRef: any = React.useRef(null);

  const {disabled, id, required, classes, labelPosition, value, onChange, name, label, placeholder, error, hasError } = useFormInput2(props);

  const updateValue = newValue => {
    // allow autofocus and set the pointer at the end of the text
    // const editor = editorRef.current;
    // editor.selection.select(editor.getBody(), true);
    // editor.selection.collapse(false);

    if (newValue === value) return;

    onChange({
      target: {
        value: newValue,
      }
    } as any);
  }

  return (
    <>
      {<Label className={classes.label} label={label} htmlFor={id} required={required} />}
      {hasError && <InputError classes={classes} error={error} />}

      <Editor
        ref={editorRef}
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        inline={props.inline}
        apiKey={props.apiKey}
        // initialValue={defaultValue}
        disabled={disabled}
        textareaName={name}
        outputFormat={props.outputFormat || 'html'}
        value={value}
        onEditorChange={updateValue}
        init={{
          ...initConfig,
          auto_focus: props.autoFocus || 'false',
          directionality: props.direction || Globals.direction,
          language: props.localeCode || Globals.localeCode,
          a11y_advanced_options: true,
          placeholder: placeholder as string,
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
    </>
  );
}
