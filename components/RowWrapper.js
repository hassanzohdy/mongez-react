import { Random } from 'reinforcements';
import React from 'react';
import Is from '@flk/supportive-is';

function uniqueId(item) {
    if (Is.scalar(item))
        return item;
    if (!item.uid) {
        item.uid = Random.id();
    }
    return item.uid;
}
function RowWrapper(props) {
    const { component: Component = React.Fragment, item, children, ...otherProps } = props;
    return React.createElement(Component, Object.assign({ key: uniqueId(item), children: children }, otherProps));
}

export default RowWrapper;
