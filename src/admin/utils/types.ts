import { Role } from "../../user";

export type AdminHeaderWebsiteIconOptions = false | string | {
    to: string;
    baseApp: string;
};

export type SidebarDisplayMode = 'permanent' | 'temporary' | 'persistent';

export type PermissionsObserver = {
    /**
     * Enable Permissions Checking
     */
    activate: Function;
    /**
     * Disable Permissions Checking
     */
    deactivate: Function;
    /**
     * Merge More Roles
     */
    set(role: Array<Role>): void;
    /**
     * Get All Permissions Roles
    */
    list(): Array<Role>;
    /**
     * Check if the given permission is allowed for current user
     * 
     * @param   {string} role
     * @returns {boolean} 
     */
    isGranted(role: string): boolean;
};


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
            websiteUrl?: AdminHeaderWebsiteIconOptions;
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