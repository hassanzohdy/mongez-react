import clsx from 'clsx';
import React from 'react';
import Is from '@flk/supportive-is';
import Globals from '../../globals';
import { If } from '../../components';
import { ucfirst, Obj } from 'reinforcements';
import Alert from '@material-ui/lab/Alert';
import { styled } from '@material-ui/core';
import { trans } from '../../localization';

const ErrorsList = styled('ul')({
    padding: 0,
});

export type FormErrorClassesList = {
    /**
     * Form Error Wrapper
     */
    root?: string;
    /**
     * Form Error Heading
     */
    heading?: string;
    /**
     * Form Error Single Error, if error is string
     */
    singleError?: string;
    /**
     * Form Error ul wrapper, if error is object or array
     */
    errorsList?: string;
    /**
     * Form Error list item
     */
    errorsListItem?: string;
}

export type FormErrorProps = {
    /**
     * Alert severity
     * 
     * @defaults error
     */
     severity?: string;
    /**
     * The error that will be displayed
     */
    error: Array<React.ReactNode> | string | object;
    /**
     * Error Heading
     * 
     * @defaults trans('validation.errorsHeading')
     */
    heading?: React.ReactNode;
    /**
     * Classes
     */
    classes?: FormErrorClassesList;
}

/**
 * Get classes error function
 * @param object classes
 * @returns Function
 */
function getClasses(classes?: FormErrorClassesList): (className: string) => string {
    return function (className): string {
        return clsx(`formError${ucfirst(className)}`, Obj.get(classes, className, ''));
    }
}

/**
 * Parse the given error for Forms
 * 
 * @TODO: 
 */
export default function FormError({ classes, error, heading = trans('validation.errorsHeading') }: FormErrorProps) {
    if (Is.empty(error)) return null;

    const errorsList = [];

    const style: any = { textAlign: Globals.left };

    if (Is.array(error)) {
        (error as Array<any>).map(error => errorsList.push(error.error || error.message || error.text || error.label || error.value || error));
    } else if (Is.plainObject(error)) {
        for (let key in (error as object)) {
            errorsList.push(error[key]);
        }
    }

    const errorClass = getClasses(classes);

    return (
        <Alert severity="error">
            <div style={style} className={errorClass('root')}>
                <If condition={!Is.empty(heading)}>
                    <div className={errorClass('heading')}>
                        <strong>{heading}:</strong>
                    </div>
                </If>

                <If condition={Is.empty(errorsList)}>
                    <div className={errorClass('singleError')}>{error}</div>
                </If>

                <If condition={!Is.empty(errorsList)}>
                    <ErrorsList className={errorClass('errorsList')}>
                        {errorsList.map((error, index) => {
                            return (
                                <li key={index} className={errorClass('errorsListItem')}>{error}</li>
                            )
                        })}
                    </ErrorsList>
                </If>
            </div>
        </Alert>
    )
}