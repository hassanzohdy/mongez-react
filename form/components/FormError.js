import React from 'react';
import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import Is from '@flk/supportive-is';
import { styled } from '@material-ui/core';
import Globals from '../../globals/index.js';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';

const ErrorsList = styled('ul')({
    padding: 0,
});
function FormError({ error, heading = trans('validation.errorsHeading') }) {
    if (Is.empty(error))
        return null;
    let errorText = error;
    if (Is.plainObject(error)) {
        errorText = [];
        for (let key in error) {
            errorText.push(error[key]);
        }
    }
    if (Is.array(errorText)) {
        const style = { textAlign: Globals.left };
        errorText = (React.createElement("div", { style: style },
            React.createElement("strong", null,
                heading,
                ":"),
            React.createElement(ErrorsList, null, errorText.map((error, key) => {
                if (Is.plainObject(error)) {
                    error = error.error || error.message || error.text || error.label;
                }
                return (React.createElement("li", { key: key }, error));
            }))));
    }
    return (React.createElement(Alert, { severity: "error" }, errorText));
}
FormError.propTypes = {
    heading: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
};

export default FormError;
