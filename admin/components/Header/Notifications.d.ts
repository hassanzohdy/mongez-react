interface NotificationsProps {
    total: Function;
    removable: boolean;
    removeAll: boolean;
    markAsSeen: boolean;
    markAllAsSeen: boolean;
    panel: any;
    service: Function;
    notificationsResponse: Function;
}
export default function Notifications(props: NotificationsProps): JSX.Element;
export {};
