import styleSettings from '../../layout/utils/style-settings.js';
import { makeStyles } from '@material-ui/core';
import Globals from '../../globals/index.js';
import '../../layout/components/Backdrop.js';
import '../../layout/components/AccessDenied.js';
import '../../layout/components/MultiDirection.js';
import '../../layout/components/Theme.js';
import '../../layout/components/Layout.js';
import '../../layout/components/LayoutWrapper.js';

const drawerWidth = styleSettings.get('dashboard.sidebar.width', 300);
const useLayoutClasses = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: styleSettings.get('dashboard.header.backgroundColor'),
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton() {
        return {
            flip: false,
            [Globals.marginRight]: theme.spacing(2),
        };
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
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
    sidebarNestedItem: {
        paddingLeft: theme.spacing(4),
    },
    sidebarListItemIcon: {
        minWidth: theme.spacing(5),
    },
    sidebarActiveColor: {
        color: styleSettings.get('dashboard.sidebar.sidebarItemColor', '#333'),
        fontWeight: 'bold',
    },
}));

export default useLayoutClasses;
