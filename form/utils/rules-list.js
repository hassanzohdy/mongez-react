import email from '../validation/rules/email.js';
import required from '../validation/rules/required.js';
import minLength from '../validation/rules/min-length.js';
import maxLength from '../validation/rules/max-length.js';

const rulesList = [
    required,
    email,
    minLength,
    maxLength,
];

export default rulesList;
