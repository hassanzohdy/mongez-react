import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import config from './../../../config';
import Notifications from './Notifications';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { trans } from './../../../localization';
import PublicIcon from '@material-ui/icons/Public';
import RefreshIcon from '@material-ui/icons/Refresh';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip, Link } from './../../../components';
import { makeStyles, styled } from '@material-ui/core';
import { sidebarDisplayMode } from './../../utils/misc';
import { refresh, switchLang } from './../../../router';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import useLayoutClasses from './../../hooks/useLayoutClasses';
import SelectInput from './../../../form/components/SelectInput';
import styleSettings from './../../../layout/utils/style-settings';
import { getLocaleCodes, getCurrentLocaleCode } from './../../../localization';

const useStyles = makeStyles({
  selectInputRoot: {
    color: '#FFF',
    paddingTop: '0.4rem',
    paddingBottom: '0.4rem',
  },
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
})

const Dropdown = props => {
  const classes = useStyles();
  return <SelectInput margin="none" {...props} classes={{ root: classes.selectInputRoot, icon: classes.whiteColor }} />
}

export default function Header(props) {
  const classes: any = useLayoutClasses(),
    sidebarIsOpened = props.sidebarIsOpened;

  const userLogout = config.get('dashboard.header.logout', () => { });

  const websiteUrl = config.get('dashboard.header.websiteUrl');

  const baseAppUrlOptions = websiteUrl ? {
    to: websiteUrl,
    relative: false
  } : {
      to: "/",
      baseApp: "/"
    }

  const localeCodesList = getLocaleCodes().map(localeCode => {
    return {
      label: trans(localeCode),
      value: localeCode,
    };
  });

  const headerClasses = useStyles();

  const notificationsSettings = config.get('dashboard.header.notifications');

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: sidebarIsOpened && sidebarDisplayMode() !== 'permanent',
      })}
    >
      <Toolbar classes={{ root: headerClasses.toolbarColor }}>
        {/* Sidebar Toggle Icon */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.onClick}
          edge="start"
          className={clsx(classes.menuButton, sidebarIsOpened && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        {/* Application Name */}
        <Typography variant="h6" noWrap>
          <HeaderLink to={'/'}>{trans('appName')}</HeaderLink>
        </Typography>
        {/* Divider */}
        <div className={classes.grow} />

        {/* Website URL */}
        <Tooltip title={trans('website')}>
          <Link target="_blank" color="inherit" {...baseAppUrlOptions}>
            <IconButton color="inherit">
              <PublicIcon />
            </IconButton>
          </Link>
        </Tooltip>

        {notificationsSettings && <Notifications {...notificationsSettings} />}

        {/* Refresh Button */}
        <Tooltip title={trans('refresh')}>
          <IconButton color="inherit" onClick={refresh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>

        {/* Switch Language Button */}
        {
          config.get('dashboard.header.locales') !== false &&
          <IconButton>
            <Dropdown value={getCurrentLocaleCode()} items={localeCodesList} onChange={item => switchLang(item.value)} />
          </IconButton>
        }

        {/* Logout Button */}
        <Tooltip title={trans('logout')}>
          <IconButton color="inherit" onClick={userLogout}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
};

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object,
  sidebarIsOpened: PropTypes.bool,
}