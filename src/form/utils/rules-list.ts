import min from "../validation/rules/min";
import max from "../validation/rules/max";
import email from "../validation/rules/email";
import match from "../validation/rules/match";
import length from "../validation/rules/length";
import required from "../validation/rules/required";
import minLength from "../validation/rules/min-length";
import maxLength from "../validation/rules/max-length";
import { InputRule } from '../validation/rules/input-rule';
import pattern from "../validation/rules/pattern";

const rulesList: Array<InputRule> = [
    required,
    email,
    minLength,
    length,
    maxLength,
    min,
    max,
    match,
    pattern
];

export default rulesList;