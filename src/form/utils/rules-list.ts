import min from "../validation/rules/min";
import max from "../validation/rules/max";
import { InputRule } from './../utils/types';
import email from "../validation/rules/email";
import url from "../validation/rules/url";
import match from "../validation/rules/match";
import length from "../validation/rules/length";
import pattern from "../validation/rules/pattern";
import required from "../validation/rules/required";
import minLength from "../validation/rules/min-length";
import maxLength from "../validation/rules/max-length";

const rulesList: Array<InputRule> = [
    required,
    email,
    url,
    minLength,
    length,
    maxLength,
    min,
    max,
    match,
    pattern
];

export const autoCompleteRules: Array<InputRule> = [
    required,
];

export const fileInputRules: Array<InputRule> = [
    required,
];

export default rulesList;