import React from 'react';
import Popover from '@material-ui/core/Popover';
import { trans } from './../../../localization';
import { Badge, IconButton, styled } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { For, ElseIf, If, Tooltip, CircleProgress } from './../../../components';

interface NotificationsProps {
    panel: any;
    total: Function;
    removable: boolean;
    removeAll: boolean;
    markAsSeen: boolean;
    service: Function;
    markAllAsSeen: boolean;
    notificationsResponse: Function;
}

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

export default function Notifications(props: NotificationsProps) {
    const { total, removable, service: serviceFunction, notificationsResponse, removeAll, markAsSeen, markAllAsSeen, panel: NotificationPanel } = props;
    const [opened, isOpened] = React.useState(false);
    const [isLoading, loading] = React.useState(null);
    const [notificationsList, setNotifications] = React.useState([]);
    const [totalNotifications, setTotalNotifications] = React.useState(0);
    const [page, setPage] = React.useState(1);

    const service = serviceFunction();

    React.useEffect(() => {
        if (isLoading === null) return;
        if (isLoading === false) return;

        service.list({ page }).then(response => {
            setNotifications(notificationsResponse(response));
            loading(false);
        });
    }, [isLoading]);

    React.useEffect(() => {
        total(setTotalNotifications);
    }, []);

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
            return <ButtonAble onClick={() => removeNotification(notification, index)}>{children}</ButtonAble>
        };
    };

    const getMarkAsSeenElement = (notification, index) => {
        return function ({ children }) {
            return <ButtonAble onClick={() => markNotificationAsSeen(notification, index)}>{children}</ButtonAble>
        };
    };

    return (
        <>
            <Tooltip title={trans('notifications')}>
                <IconButton onClick={handleClick} color="inherit">
                    <Badge badgeContent={totalNotifications} color="error">
                        {totalNotifications > 0 ? <NotificationsActiveIcon /> : <NotificationsIcon />}
                    </Badge>
                </IconButton>
            </Tooltip>

            <Popover
                id={id}
                open={opened}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <PanelContent>
                    <If condition={isLoading === true}>
                        <LoaderWrapper>
                            <CircleProgress />
                        </LoaderWrapper>
                    </If>
                    <ElseIf condition={!isLoading && notificationsList.length === 0}>
                        <NoNotifications>{trans('noNotifications')}</NoNotifications>
                    </ElseIf>
                    <ElseIf condition={[null, false].includes(isLoading)}>
                        <For array={notificationsList} render={(notification, index) => (
                            <NotificationPanel
                                RemoveElement={getRemoveElement(notification, index)}
                                MarkAsSeenElement={getMarkAsSeenElement(notification, index)}
                                notification={notification} />
                        )} />
                    </ElseIf>
                </PanelContent>
            </Popover>
        </>
    )
}