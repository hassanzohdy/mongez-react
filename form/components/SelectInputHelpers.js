import { Obj } from 'reinforcements';
import React from 'react';
import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import Is from '@flk/supportive-is';
import { makeStyles, styled, MenuItem, Chip } from '@material-ui/core';
import '../../components/Link.js';
import '../../components/Modal.js';
import 'material-ui-image';
import '../../components/Chart.js';
import Avatar from '../../components/Avatar.js';
import '../../components/Tabs.js';
import '../Context/FormContext.js';
import '../../components/Confirm.js';
import 'react-timeago';
import '../../components/Tooltip.js';
import '../../components/ScrollTo.js';
import '../../components/Redirect.js';
import '../../components/Accordion.js';
import '../../components/ColoredIcon.js';
import 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import '@material-ui/icons/AddCircle';
import '../../components/Preloaders/Spinner/index.js';
import '../../components/ColoredButton.js';
import '@material-ui/icons/Delete';
import '../../components/LabelledOutline.js';
import '../../components/Condition.js';
import '../../components/Grid/GridItemCheckBoxContainer.js';
import '../../components/Badge.js';
import { getItems, getItem } from '../utils/select-items.js';

const useStyles = makeStyles((theme) => ({
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    avatarSize: {
        width: '20px',
        height: '20px',
    },
    chip: {
        margin: 2,
    },
    smallText: {
        fontSize: theme.spacing(1.5)
    }
}));
const AvatarWrapper = styled('div')({
    marginRight: '0.4rem',
    display: 'inline-block',
    verticalAlign: 'middle',
});
const MenuItemGroup = React.forwardRef((props, ref) => {
    const { group } = props;
    return React.createElement(MenuItem, { disabled: true, ref: ref }, group);
});
const renderItems = (items, imagable) => {
    if (imagable && imagable === true) {
        imagable = 'image';
    }
    return items.map((item, index) => {
        return React.createElement(MenuItem, { disabled: item.disabled === true, key: index, value: item.value },
            imagable &&
                React.createElement(AvatarWrapper, null,
                    React.createElement(Avatar, { src: item[imagable] })),
            item.label);
    });
};
const selectItems = (items, groupBy, isLoading, imagable) => {
    if (isLoading) {
        items = [{
                label: trans('loading'),
                value: '',
                disabled: true,
            }];
    }
    if (groupBy) {
        return items.map((item, index) => {
            return [React.createElement(MenuItemGroup, { imagable: imagable, key: index, group: Obj.get(item, 'groupBy') }), ...renderItems(item.items, imagable)];
        });
    }
    return renderItems(items, imagable);
};
const RenderSelectedItem = ({ item, imagable }) => {
    const classes = useStyles();
    if (!item)
        return null;
    if (imagable && imagable === true) {
        imagable = 'image';
    }
    return (React.createElement(React.Fragment, null,
        imagable &&
            React.createElement(AvatarWrapper, null,
                React.createElement(Avatar, { classes: { root: classes.avatarSize }, src: item[imagable] })),
        item.label));
};
const RenderMultipleSelectedItems = ({ selectedItems }) => {
    const classes = useStyles();
    return (React.createElement("div", { className: classes.chips }, selectedItems.map(item => (React.createElement(Chip, { key: item.value, className: classes.chip, label: item.label })))));
};
function RenderSelectedValues({ items, selected, opened, groupBy, label, placeholder, imagable }) {
    // Render Placeholder On Empty Selection as a text 
    if (Is.empty(selected) || Is.empty(items)) {
        if (label && !opened)
            return null;
        return placeholder ? trans(placeholder) : null;
        // return <MenuItem className={classes.smallText}>{placeholder}</MenuItem>
    }
    // if the selected is an array 
    // then render the selected items in chips for now
    if (Is.array(selected)) {
        return React.createElement(RenderMultipleSelectedItems, { selectedItems: getItems(items, selected, groupBy) });
    }
    // render single selection
    return React.createElement(RenderSelectedItem, { imagable: imagable, item: getItem(items, selected, groupBy) });
}

export { RenderSelectedItem, RenderSelectedValues, selectItems };
