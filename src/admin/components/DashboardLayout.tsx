import clsx from 'clsx';
import React from 'react';
import Header from "./Header";
import Sidebar from "./Sidebar";
import PropTypes from 'prop-types';
import { Layout } from "./../../layout";
import { sidebarDisplayMode } from './../utils/misc';
import useLayoutClasses from './../hooks/useLayoutClasses';

let sidebarOpenLastStatus;

export default function DashboardLayout(props) {
    const classes: any = useLayoutClasses();
    const [sidebarIsOpened, setOpen] = React.useState(sidebarOpenLastStatus !== undefined ? sidebarOpenLastStatus : false);

    const openSidebar = () => {
        setOpen(true);
        sidebarOpenLastStatus = true;
    };

    const closeSidebar = () => {
        setOpen(false);
        sidebarOpenLastStatus = false;
    };

    return (
        <Layout>
            <div className={classes.root}>
                <Header
                    sidebarIsOpened={sidebarIsOpened}
                    onClick={openSidebar}
                />
                <Sidebar
                    open={sidebarIsOpened}
                    onClose={closeSidebar}
                />
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: sidebarIsOpened || sidebarDisplayMode() === 'permanent',
                    })}
                >
                    <div className={classes.drawerHeader} />
                    {props.children}
                </main>
            </div>
        </Layout>
    );
}

DashboardLayout.propTypes = {
    children: PropTypes.any.isRequired,
};