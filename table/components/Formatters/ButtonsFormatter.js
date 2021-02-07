import React from 'react';
import { ButtonGroup } from '@material-ui/core';

function ButtonsFormatter({ record, setRecord, column, columnIndex, rowIndex }) {
    const { buttons } = column;
    return (React.createElement(ButtonGroup, null, buttons.map((Button, buttonIndex) => (React.createElement(Button, { key: buttonIndex, record: record, setRecord: setRecord, rowIndex: rowIndex, columnIndex: columnIndex, column: column })))));
}

export default ButtonsFormatter;
