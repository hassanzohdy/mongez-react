import cls from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core';
import { Link } from './../../../components';
import SidebarContext from './SidebarContext';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import useLayoutClasses from './../../hooks/useLayoutClasses';

const ItemLink = styled(Link)({
    color: '#333',
});

interface ISidebarListItem {
    text: string;
    route: string;
    nested?: boolean;
    onClick: Function;
    icon: any;
}

export default function SidebarListItem(props: ISidebarListItem) {
    let { text, route, nested, onClick } = props;
    const classes: any = useLayoutClasses();

    const { currentRoute } = React.useContext(SidebarContext);

    const [isActiveItem, setActiveItem] = React.useState(currentRoute === route);

    React.useEffect(() => {
        setActiveItem(route === currentRoute);
    }, [currentRoute, route]);

    const className = cls(classes.sidebarListItem, {
        [classes.sidebarNestedItem]: nested === true,
    });

    const coloredTextClass = cls({
        [classes.sidebarActiveColor]: isActiveItem === true,
    });

    return (
        <ListItem
            className={className}
            component={ItemLink}
            to={route}
            onClick={onClick}
            button
        >
            <ListItemIcon classes={{ root: classes.sidebarListItemIcon }}>
                {<props.icon />}
            </ListItemIcon>
            <ListItemText disableTypography classes={{ root: coloredTextClass }} primary={text} />
        </ListItem>
    );
}

SidebarListItem.propTypes = {
    text: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    nested: PropTypes.bool
};