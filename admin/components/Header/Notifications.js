import 'reinforcements';
import React from 'react';
import '../../../localization/locales.js';
import { trans } from '../../../localization/translator.js';
import '@flk/supportive-is';
import { IconButton, Badge, styled } from '@material-ui/core';
import For from '../../../components/For.js';
import '../../../components/Link.js';
import '../../../components/Modal.js';
import 'material-ui-image';
import '../../../components/Chart.js';
import '../../../components/Avatar.js';
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
import '../../../components/Preloaders/Spinner/index.js';
import '../../../components/ColoredButton.js';
import '@material-ui/icons/Delete';
import '../../../components/LabelledOutline.js';
import { If, ElseIf } from '../../../components/Condition.js';
import CircleProgress from '../../../components/Preloaders/CircleProgress.js';
import '../../../components/Grid/GridItemCheckBoxContainer.js';
import '../../../components/Badge.js';
import Popover from '@material-ui/core/Popover';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const PanelContent = styled('div')({
    width: '450px',
});
const LoaderWrapper = styled('div')({
    padding: '1rem 2rem',
});
const ButtonAble = styled('span')({
    cursor: 'pointer'
});
const NoNotifications = styled('div')({
    textAlign: 'center',
    color: '#666',
    padding: '1rem',
});
function Notifications(props) {
    const { total, removable, service: serviceFunction, notificationsResponse, removeAll, markAsSeen, markAllAsSeen, panel: NotificationPanel } = props;
    const [opened, isOpened] = React.useState(false);
    const [isLoading, loading] = React.useState(null);
    const [notificationsList, setNotifications] = React.useState([]);
    const [totalNotifications, setTotalNotifications] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const service = serviceFunction();
    React.useEffect(() => {
        if (isLoading === null)
            return;
        if (isLoading === false)
            return;
        service.list({ page }).then(response => {
            setNotifications(notificationsResponse(response));
            loading(false);
        });
    }, [isLoading]);
    React.useEffect(() => {
        total(setTotalNotifications);
    }, []);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        isOpened(!opened);
        if (!opened) {
            loading(true);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
        isOpened(false);
    };
    const id = opened ? 'simple-popover' : undefined;
    const removeNotification = (notification, index) => {
        notificationsList.splice(index, 1);
        service.delete(notification.id);
        setNotifications([...notificationsList]);
    };
    const markNotificationAsSeen = (notification, index) => {
        notification.seen = true;
        service.markAsSeen(notification.id);
        setNotifications([...notificationsList]);
    };
    const getRemoveElement = (notification, index) => {
        return function ({ children }) {
            return React.createElement(ButtonAble, { onClick: () => removeNotification(notification, index) }, children);
        };
    };
    const getMarkAsSeenElement = (notification, index) => {
        return function ({ children }) {
            return React.createElement(ButtonAble, { onClick: () => markNotificationAsSeen(notification) }, children);
        };
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: trans('notifications') },
            React.createElement(IconButton, { onClick: handleClick, color: "inherit" },
                React.createElement(Badge, { badgeContent: totalNotifications, color: "error" }, totalNotifications > 0 ? React.createElement(NotificationsActiveIcon, null) : React.createElement(NotificationsIcon, null)))),
        React.createElement(Popover, { id: id, open: opened, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'center',
            } },
            React.createElement(PanelContent, null,
                React.createElement(If, { condition: isLoading === true },
                    React.createElement(LoaderWrapper, null,
                        React.createElement(CircleProgress, null))),
                React.createElement(ElseIf, { condition: !isLoading && notificationsList.length === 0 },
                    React.createElement(NoNotifications, null, trans('noNotifications'))),
                React.createElement(ElseIf, { condition: [null, false].includes(isLoading) },
                    React.createElement(For, { array: notificationsList, render: (notification, index) => (React.createElement(NotificationPanel, { RemoveElement: getRemoveElement(notification, index), MarkAsSeenElement: getMarkAsSeenElement(notification), notification: notification })) }))))));
}

export default Notifications;
