import 'reinforcements';
import config from '../../../config/index.js';
import '../../../router/router-history.js';
import React from 'react';
import '../../../localization/locales.js';
import { trans } from '../../../localization/translator.js';
import '../../../router/routes-list.js';
import { currentRoute } from '../../../router/navigator.js';
import 'react-dom';
import 'react-router-dom';
import { Box } from '@material-ui/core';
import '../../../router/renderer.js';
import '../../../router/update-current-localization.js';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import permissionsObserver from '../../utils/permissionsObserver.js';
import useLayoutClasses from '../../hooks/useLayoutClasses.js';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import SidebarContext from './SidebarContext.js';
import Divider from '@material-ui/core/Divider';
import SidebarListItem from './SidebarListItem.js';
import SidebarListItemGroup from './SidebarListItemGroup.js';
import sidebarItems from '../../utils/sidebar-items-list.js';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

function Sidebar(props) {
    let { onClose, open } = props;
    const theme = useTheme();
    const classes = useLayoutClasses();
    const route = currentRoute();
    const Heading = config.get('dashboard.sidebar.heading', props => React.createElement("h1", Object.assign({}, props), trans('appName')));
    const sidebarContextValue = {
        currentRoute: route,
    };
    let itemsList = sidebarItems.getItems().filter(item => {
        if (item.role) {
            return permissionsObserver.isGranted(item.role);
        }
        if (item.items) {
            item.items = item.items.filter(item => {
                if (item.role) {
                    return permissionsObserver.isGranted(item.role);
                }
                return true;
            });
            return item.items.length > 0;
        }
        return true;
    }).map((item, index) => {
        // in this case, we'll return itemGroup
        if (item.items) {
            return React.createElement(SidebarListItemGroup, { key: index, text: item.text, onClick: onClose, icon: item.icon, items: item.items });
        }
        // otherwise, we'll just return a list item
        return React.createElement(SidebarListItem, { key: index, text: item.text, icon: item.icon, onClick: onClose, route: item.route });
    });
    return (React.createElement(SidebarContext.Provider, { value: sidebarContextValue },
        React.createElement(Drawer, { className: classes.drawer, variant: "temporary", anchor: "left", open: open, onClose: onClose, classes: {
                paper: classes.drawerPaper,
            } },
            React.createElement("div", { className: classes.drawerHeader },
                React.createElement(Box, { flexGrow: 1 },
                    React.createElement(Heading, { onClick: onClose })),
                React.createElement(Box, null,
                    React.createElement(IconButton, { onClick: onClose }, theme.direction === 'ltr' ? React.createElement(ChevronLeftIcon, null) : React.createElement(ChevronRightIcon, null)))),
            React.createElement(Divider, null),
            React.createElement(List, { component: "nav", className: classes.sidebar }, itemsList))));
}

export default Sidebar;
