import 'reinforcements';
import React from 'react';
import mapObject from '../utils/mapObject.js';

function For({ array = null, object = null, key = null, render, ...basicIteration }) {
    if (array) {
        return array.map((item, index) => {
            return React.createElement(React.Fragment, { key: key ? item[key] : index }, render(item, index));
        });
    }
    if (object) {
        return mapObject(object, (objectKey, value) => {
            return React.createElement(React.Fragment, { key: key ? value[key] : objectKey }, render(objectKey, value));
        });
    }
    if (typeof basicIteration.i !== undefined) {
        let data = [];
        let i = basicIteration.i;
        while (true) {
            if (basicIteration.when(i) !== true)
                break;
            data.push(React.createElement(React.Fragment, { key: key || i }, render(i)));
            i = basicIteration.then ? basicIteration.then(i) : ++i;
        }
        return data;
    }
    return null;
}

export default For;
