import React from 'react';
import PropTypes from 'prop-types';
import Is from '@flk/supportive-is';
import Globals from '../../globals';
import Alert from '@material-ui/lab/Alert';
import { styled } from '@material-ui/core';
import { trans } from '../../localization';
import { If } from '../../components';

const ErrorsList = styled('ul')({
    padding: 0,
});

export default function FormError({ error, heading = trans('validation.errorsHeading') }) {
    if (Is.empty(error)) return null;

    const errorsList = [];

    const style: any = { textAlign: Globals.left };

    if (Is.array(error)) {
        error.map(error => errorsList.push(error.error || error.message || error.text || error.label || error.value || error));
    } else if (Is.plainObject(error)) {
        for (let key in error) {
            errorsList.push(error[key]);
        }
    }

    return (
        <Alert severity="error">
            <div style={style}>
                <strong>{heading}:</strong>

                <If condition={Is.empty(errorsList)}>{error}</If>

                <If condition={!Is.empty(errorsList)}>
                    <ErrorsList>
                        {errorsList.map((error, index) => {
                            return (
                                <li key={index}>{error}</li>
                            )
                        })}
                    </ErrorsList>
                </If>
            </div>
        </Alert>
    )
}

FormError.propTypes = {
    heading: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
}