import React from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import useLayoutClasses from '../../hooks/useLayoutClasses.js';
import List from '@material-ui/core/List';
import SidebarContext from './SidebarContext.js';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SidebarListItem from './SidebarListItem.js';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';

function SidebarListItemGroup(props) {
    const { text, items, onClick } = props;
    const sidebarGroupRoutes = [];
    let itemsList = items.map((item, index) => {
        sidebarGroupRoutes.push(item.route);
        return (React.createElement(SidebarListItem, { nested: true, key: index, onClick: onClick, route: item.route, text: item.text, icon: item.icon }));
    });
    const { currentRoute } = React.useContext(SidebarContext);
    const [isActiveGroup, setActiveGroup] = React.useState(sidebarGroupRoutes.includes(currentRoute));
    const [open, setOpen] = React.useState(sidebarGroupRoutes.includes(currentRoute));
    const classes = useLayoutClasses();
    // when the sidebar group is opened
    // when an item from the list is matching the current route
    React.useEffect(() => {
        setActiveGroup(sidebarGroupRoutes.includes(currentRoute));
    }, [currentRoute, sidebarGroupRoutes]);
    const coloredText = clsx({
        [classes.sidebarActiveColor]: isActiveGroup === true,
    });
    const handleClick = () => {
        setOpen(!open);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(ListItem, { button: true, onClick: handleClick },
            React.createElement(ListItemIcon, { classes: { root: classes.sidebarListItemIcon } }, React.createElement(props.icon, null)),
            React.createElement(ListItemText, { classes: { root: coloredText }, primary: text }),
            open ? React.createElement(ExpandLess, null) : React.createElement(ExpandMoreIcon, null)),
        React.createElement(Collapse, { in: open, timeout: "auto", unmountOnExit: true },
            React.createElement(List, { component: "div", disablePadding: true }, itemsList))));
}
SidebarListItemGroup.propTypes = {
    text: PropTypes.string.isRequired,
    // icon: PropTypes.node.isRequired, 
    nestedItemClass: PropTypes.string,
    items: PropTypes.array.isRequired,
};

export default SidebarListItemGroup;
