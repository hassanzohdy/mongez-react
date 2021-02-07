import 'reinforcements';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import '../../layout/components/Backdrop.js';
import '../../layout/components/AccessDenied.js';
import '../../layout/components/MultiDirection.js';
import '../../layout/components/Theme.js';
import Layout from '../../layout/components/Layout.js';
import '../../layout/components/LayoutWrapper.js';
import useLayoutClasses from '../hooks/useLayoutClasses.js';
import Header from './Header/Header.js';
import Sidebar from './Sidebar/Sidebar.js';

function DashboardLayout(props) {
    const classes = useLayoutClasses();
    const [sidebarIsOpened, setOpen] = React.useState(false);
    const openSidebar = () => {
        setOpen(true);
    };
    const closeSidebar = () => {
        setOpen(false);
    };
    return (React.createElement(Layout, null,
        React.createElement("div", { className: classes.root },
            React.createElement(Header, { sidebarIsOpened: sidebarIsOpened, onClick: openSidebar }),
            React.createElement(Sidebar, { open: sidebarIsOpened, onClose: closeSidebar }),
            React.createElement("main", { className: clsx(classes.content, {
                    [classes.contentShift]: sidebarIsOpened,
                }) },
                React.createElement("div", { className: classes.drawerHeader }),
                props.children))));
}
DashboardLayout.propTypes = {
    children: PropTypes.any.isRequired,
};

export default DashboardLayout;
