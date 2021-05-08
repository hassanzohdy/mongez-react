import cls from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import SidebarContext from './SidebarContext';
import SidebarListItem from './SidebarListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import useLayoutClasses from './../../hooks/useLayoutClasses';

interface ISidebarListItemGroup {
    icon: any;
    items: any[];
    text: string;
    onClick: Function;
}

export default function SidebarListItemGroup(props: ISidebarListItemGroup) {
    const { text, items, onClick } = props;
    const [sidebarGroupRoutes] = React.useState([]);

    let itemsList = items.map((item, index) => {
        sidebarGroupRoutes.push(item.route);
        return (
            <SidebarListItem
                nested
                key={index}
                onClick={onClick}
                route={item.route}
                text={item.text}
                icon={item.icon}
            />
        )
    });

    const { currentRoute } = React.useContext(SidebarContext);
    const [isActiveGroup, setActiveGroup] = React.useState(sidebarGroupRoutes.includes(currentRoute));

    const [open, setOpen] = React.useState(sidebarGroupRoutes.includes(currentRoute));

    const classes: any = useLayoutClasses();

    // when the sidebar group is opened
    // when an item from the list is matching the current route

    React.useEffect(() => {
        setActiveGroup(sidebarGroupRoutes.includes(currentRoute));
    }, [currentRoute, sidebarGroupRoutes]);

    const coloredText = cls({
        [classes.sidebarActiveColor]: isActiveGroup === true,
    });

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItem className={classes.sidebarListItem} button onClick={handleClick}>
                <ListItemIcon classes={{ root: classes.sidebarListItemIcon }}>
                    {<props.icon />}
                </ListItemIcon>
                <ListItemText classes={{ root: coloredText, primary: classes.sidebarGroupHeading }} primary={text} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {itemsList}
                </List>
            </Collapse>
        </>
    );
}

SidebarListItemGroup.propTypes = {
    text: PropTypes.string.isRequired,
    nestedItemClass: PropTypes.string,
    items: PropTypes.array.isRequired,
};