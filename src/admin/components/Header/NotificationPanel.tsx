import React from 'react';
import config from '../../../config';
import { Box, styled } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { ColoredIcon,TextCenter, If } from './../../../components';

const PanelWrapper = styled('div')({
    padding: '1rem',
    borderBottom: '1px solid #eee',
});

const SeenTitle = styled('div')({
});

const UnseenTitle = styled('div')({
    fontWeight: 'bold',
});

const CreatedAt = styled('div')({
    color: '#999',
    marginTop: '0.5rem',
    fontSize: '0.6rem',
});

export default function NotificationPanel({ notification, RemoveElement, MarkAsSeenElement }) {
    let createdAt = config.get('dashboard.header.notifications.createdAt');

    if (createdAt) {
        createdAt = createdAt(notification);
    }

    return (
        <>
            <PanelWrapper>
                <Box display="flex">
                    <Box flexGrow={1}>
                        {notification.seen ? <SeenTitle>{notification.title}</SeenTitle> : <UnseenTitle>{notification.title}</UnseenTitle>}
                        <If condition={createdAt !== null}>
                            <CreatedAt>{createdAt}</CreatedAt>
                        </If>
                    </Box>
                    <Box width="25px">
                        <TextCenter>
                            <RemoveElement>
                                <ColoredIcon icon={CloseIcon} title="Remove" color="#F00" />
                            </RemoveElement>
                            <MarkAsSeenElement>
                                <ColoredIcon icon={CheckIcon} title="Mark As Seen" color="teal" />
                            </MarkAsSeenElement>
                        </TextCenter>
                    </Box>
                </Box>

            </PanelWrapper>
        </>
    )
}