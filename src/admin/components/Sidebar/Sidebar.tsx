import cls from 'clsx';
import React from 'react';
import config from './../../../config';
import { Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import SidebarContext from './SidebarContext';
import Divider from '@material-ui/core/Divider';
import SidebarListItem from './SidebarListItem';
import { trans } from './../../../localization';
import { currentRoute } from './../../../router';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { sidebarDisplayMode } from './../../utils/misc';
import SidebarListItemGroup from './SidebarListItemGroup';
import sidebarItems from './../../utils/sidebar-items-list';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useLayoutClasses from './../../hooks/useLayoutClasses';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import permissionsObserver from './../../utils/permissionsObserver';

export default function Sidebar(props) {
    let { onClose, open } = props;
    const theme = useTheme();
    const classes: any = useLayoutClasses();
    const route = currentRoute();

    const Heading = config.get('dashboard.sidebar.heading', props => <h1 {...props}>{trans('appName')}</h1>);
    const displayMode = sidebarDisplayMode();

    const sidebarContextValue = {
        currentRoute: route,
    };

    const closeSidebar = () => {
        if (open && displayMode === 'temporary') {
            onClose();
        }
    }


    const filterItems = items => {
        return items.filter(item => {
            if (item.role) {
                return permissionsObserver.isGranted(item.role);
            }

            if (item.items) {
                item.items = filterItems(item.items);

                return item.items.length > 0;
            }

            return true;
        });
    };

    const mapItems = items => {
        return items.map((item: any, index) => {
            // in this case, we'll return itemGroup
            if (item.items) {
                return <SidebarListItemGroup
                    key={index}
                    text={item.text}
                    onClick={closeSidebar}
                    icon={item.icon}
                    items={item.items}
                />;
            }

            // otherwise, we'll just return a list item
            return <SidebarListItem
                key={index}
                text={item.text}
                icon={item.icon}
                onClick={closeSidebar}
                route={item.route} />;
        });
    }

    const getItemsList = items => {
        return mapItems(filterItems(items));
    };

    let itemsList = getItemsList(sidebarItems.getItems());

    return (
        <SidebarContext.Provider value={sidebarContextValue}>
            <Drawer
                className={cls({
                    [classes.drawer]: displayMode === 'temporary',
                })}
                variant={displayMode}
                anchor="left"
                open={open}
                onClose={onClose}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Box flexGrow={1}>
                        <Heading onClick={onClose} />
                    </Box>
                    <Box>
                        {displayMode !== 'permanent' &&
                            <IconButton onClick={onClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        }
                    </Box>
                </div>
                <Divider />

                <List
                    component="nav"
                    className={classes.sidebar}
                >
                    {itemsList}
                </List>
            </Drawer>
        </SidebarContext.Provider>
    );
}