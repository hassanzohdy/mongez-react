import 'reinforcements';
import React from 'react';
import 'sprintf-js';
import '../../../localization/locales.js';
import '@flk/supportive-is';
import { styled } from '@material-ui/core';
import Link from '../../../components/Link.js';
import PropTypes from 'prop-types';
import '../../../components/Modal.js';
import 'material-ui-image';
import '../../../components/Chart.js';
import '../../../components/Avatar.js';
import '../../../components/Tabs.js';
import '../../../form/Context/FormContext.js';
import '../../../components/Confirm.js';
import 'react-timeago';
import '../../../components/Tooltip.js';
import '../../../components/ScrollTo.js';
import '../../../components/Redirect.js';
import '../../../components/Accordion.js';
import '../../../components/ColoredIcon.js';
import 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import '@material-ui/icons/AddCircle';
import clsx from 'clsx';
import '../../../components/Preloaders/Spinner/index.js';
import '../../../components/ColoredButton.js';
import '@material-ui/icons/Delete';
import '../../../components/LabelledOutline.js';
import '../../../components/Condition.js';
import '../../../components/Grid/GridItemCheckBoxContainer.js';
import '../../../components/Badge.js';
import useLayoutClasses from '../../hooks/useLayoutClasses.js';
import SidebarContext from './SidebarContext.js';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const ItemLink = styled(Link)({
    color: '#333',
});
function SidebarListItem(props) {
    let { text, route, nested, onClick } = props;
    const classes = useLayoutClasses();
    const { currentRoute } = React.useContext(SidebarContext);
    const [isActiveItem, setActiveItem] = React.useState(currentRoute === route);
    React.useEffect(() => {
        setActiveItem(route === currentRoute);
    }, [currentRoute, route]);
    const className = clsx({
        [classes.sidebarNestedItem]: nested === true,
    });
    const coloredTextClass = clsx({
        [classes.sidebarActiveColor]: isActiveItem === true,
    });
    return (React.createElement(ListItem, { className: className, component: ItemLink, to: route, onClick: onClick, button: true },
        React.createElement(ListItemIcon, { classes: { root: classes.sidebarListItemIcon } }, React.createElement(props.icon, null)),
        React.createElement(ListItemText, { disableTypography: true, classes: { root: coloredTextClass }, primary: text })));
}
SidebarListItem.propTypes = {
    text: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    nested: PropTypes.bool
};

export default SidebarListItem;
