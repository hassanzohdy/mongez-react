import withInputType from '../utils/withInputType.js';

const TextAreaInput = withInputType('email', {
    rows: 8,
    multiline: true,
});

export default TextAreaInput;
