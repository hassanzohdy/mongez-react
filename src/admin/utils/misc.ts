import config from "./../../config";

export type SidebarDisplayMode = 'permanent' | 'temporary' | 'persistent';

export function sidebarDisplayMode(): SidebarDisplayMode {
    return config.get('dashboard.sidebar.display', 'persistent');
}