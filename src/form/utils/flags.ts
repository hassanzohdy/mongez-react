import config from "../../config";
import { InputTheme } from "./types";

export const DISABLE_INPUT_CHANGE = '__DISABLE__';

export function getFormInputTheme(): InputTheme {
    return config.get('form.input.theme', 'material');
}