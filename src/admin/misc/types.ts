import { SidebarDisplayMode } from "../utils/misc";

export interface HeaderNotificationService {
    deleteAll();
    markAllAsSeen();
    list: Function;
    delete(id: number);
    markAsSeen(id: number);
};

export type AdminDashboardSettings = {
    dashboard?: {
        header: {
            locales?: boolean;
            logout?: Function;
            websiteUrl?: string | false | null;
            notifications?: {
                total?(setTotal: Function): void;
                removable?: boolean;
                removeAll?: boolean;
                markAsSeen?: boolean;
                markAllAsSeen?: boolean;
                service?(): HeaderNotificationService;
                notificationsResponse?(response): Array<any>;
                panel?: React.ReactNode;
                createdAt?(notification): string;
            }
        };
        sidebar?: {
            heading?: React.ReactNode;
            display?: SidebarDisplayMode;
        }
    }
};