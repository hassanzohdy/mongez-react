import 'reinforcements';
import config from '../../../config/index.js';
import '../../../router/router-history.js';
import React from 'react';
import { getLocaleCodes, getCurrentLocaleCode } from '../../../localization/locales.js';
import { trans } from '../../../localization/translator.js';
import '../../../router/routes-list.js';
import '@flk/supportive-is';
import { refresh, switchLang } from '../../../router/navigator.js';
import 'react-dom';
import 'react-router-dom';
import styleSettings from '../../../layout/utils/style-settings.js';
import { makeStyles, styled } from '@material-ui/core';
import '../../../router/renderer.js';
import '../../../router/update-current-localization.js';
import Link from '../../../components/Link.js';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import '../../../components/Modal.js';
import 'material-ui-image';
import '../../../components/Chart.js';
import '../../../components/Avatar.js';
import AppBar from '@material-ui/core/AppBar';
import '../../../components/Tabs.js';
import '../../../form/Context/FormContext.js';
import '../../../components/Confirm.js';
import 'react-timeago';
import Tooltip from '../../../components/Tooltip.js';
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
import Toolbar from '@material-ui/core/Toolbar';
import SelectInput from '../../../form/components/SelectInput.js';
import Notifications from './Notifications.js';
import MenuIcon from '@material-ui/icons/Menu';
import PublicIcon from '@material-ui/icons/Public';
import RefreshIcon from '@material-ui/icons/Refresh';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import useLayoutClasses from '../../hooks/useLayoutClasses.js';

const useStyles = makeStyles({
    whiteColor: {
        color: '#FFF',
    },
    toolbarColor: {
        color: styleSettings.get('dashboard.header.color'),
    }
});
const HeaderLink = styled(Link)({
    color: styleSettings.get('dashboard.header.linkColor', 'inherit'),
    textDecoration: 'none'
});
const Dropdown = props => {
    const classes = useStyles();
    return React.createElement(SelectInput, Object.assign({}, props, { disableUnderline: true, classes: { root: classes.whiteColor, icon: classes.whiteColor } }));
};
function Header(props) {
    const classes = useLayoutClasses(), sidebarIsOpened = props.sidebarIsOpened;
    const userLogout = config.get('dashboard.header.logout', () => { });
    const websiteUrl = config.get('dashboard.header.websiteUrl');
    const baseAppUrlOptions = websiteUrl ? {
        to: websiteUrl,
        relative: false
    } : {
        to: "/",
        baseApp: "/"
    };
    const localeCodesList = getLocaleCodes().map(localeCode => {
        return {
            label: trans(localeCode),
            value: localeCode,
        };
    });
    const headerClasses = useStyles();
    const notificationsSettings = config.get('dashboard.header.notifications');
    return (React.createElement(AppBar, { position: "absolute", className: clsx(classes.appBar, {
            [classes.appBarShift]: sidebarIsOpened,
        }) },
        React.createElement(Toolbar, { classes: { root: headerClasses.toolbarColor } },
            React.createElement(IconButton, { color: "inherit", "aria-label": "open drawer", onClick: props.onClick, edge: "start", className: clsx(classes.menuButton, sidebarIsOpened && classes.hide) },
                React.createElement(MenuIcon, null)),
            React.createElement(Typography, { variant: "h6", noWrap: true },
                React.createElement(HeaderLink, { to: '/' }, trans('appName'))),
            React.createElement("div", { className: classes.grow }),
            React.createElement(Tooltip, { title: trans('website') },
                React.createElement(Link, Object.assign({ target: "_blank", color: "inherit" }, baseAppUrlOptions),
                    React.createElement(IconButton, { color: "inherit" },
                        React.createElement(PublicIcon, null)))),
            notificationsSettings && React.createElement(Notifications, Object.assign({}, notificationsSettings)),
            React.createElement(Tooltip, { title: trans('refresh') },
                React.createElement(IconButton, { color: "inherit", onClick: refresh },
                    React.createElement(RefreshIcon, null))),
            config.get('dashboard.header.locales') !== false &&
                React.createElement(IconButton, null,
                    React.createElement(Dropdown, { value: getCurrentLocaleCode(), items: localeCodesList, onChange: item => switchLang(item.value) })),
            React.createElement(Tooltip, { title: trans('logout') },
                React.createElement(IconButton, { color: "inherit", onClick: userLogout },
                    React.createElement(LogoutIcon, null))))));
}
Header.propTypes = {
    onClick: PropTypes.func.isRequired,
    classes: PropTypes.object,
    sidebarIsOpened: PropTypes.bool,
};

export default Header;
