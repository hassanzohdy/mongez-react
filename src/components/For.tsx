import React from 'react';
import { Obj } from 'reinforcements';
import { mapObject } from './../utils';

export default function For({ array = null, object = null, keyName = null, render, ...basicIteration }) {
    if (array) {
        return array.map((item, index) => {
            return <React.Fragment key={keyName ? Obj.get(item, keyName) || index : index}>{render(item, index)}</React.Fragment>
        });
    }

    if (object) {
        return mapObject(object, (objectKey, value) => {
            return <React.Fragment key={keyName ? value[keyName] : objectKey}>{render(objectKey, value)}</React.Fragment>;
        });
    }

    if (typeof basicIteration.i !== undefined && basicIteration.when) {
        let data = [];

        let i = basicIteration.i;

        while (true) {
            if (basicIteration.when(i) !== true) break;

            data.push(
                <React.Fragment key={keyName || i}>{render(i)}</React.Fragment>
            );

            i = basicIteration.then ? basicIteration.then(i) : ++i;
        }

        return data;
    }

    return null;
}