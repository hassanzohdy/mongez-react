import Globals from "./../../globals";
import { styleSettings } from "./../../layout";
import { makeStyles } from "@material-ui/core";

const getSidebarWidth = (): Number => Number(styleSettings.get('dashboard.sidebar.width', 350));

const useLayoutClasses = makeStyles((theme): any => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        // backgroundColor: styleSettings.get('dashboard.header.backgroundColor'),
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift() {
        const drawerWidth = getSidebarWidth();

        return {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        };
    },
    menuButton() {
        return {
            // flip: false, // disable auto switching
            // [Globals.marginRight]: theme.spacing(2),
            marginRight: theme.spacing(2),
        };
    },
    hide: {
        display: 'none',
    },
    drawer() {
        const drawerWidth = getSidebarWidth();

        return {
            width: drawerWidth,
            flexShrink: 0,
        };
    },
    drawerPaper() {
        const drawerWidth = getSidebarWidth();

        return {
            width: drawerWidth,
        };
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        maxWidth: '100%',
        padding: theme.spacing(3),
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift() {
        const drawerWidth = getSidebarWidth();

        return {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            [Globals.marginLeft]: drawerWidth,
        };
    },
    sidebar: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    sidebarListItem: {
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
    },
    sidebarNestedItem: {
        paddingLeft: theme.spacing(4),
    },
    sidebarListItemIcon: {
        minWidth: theme.spacing(5),
    },
    sidebarGroupHeading: {
        fontSize: 'inherit',
    },
    sidebarActiveColor: {
        color: styleSettings.get('dashboard.sidebar.sidebarItemColor', '#333'),
        fontWeight: 'bold',
    },
}));

export default useLayoutClasses;