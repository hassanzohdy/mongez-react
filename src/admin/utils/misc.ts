import config from "./../../config";
import { SidebarDisplayMode } from "./types";

export function sidebarDisplayMode(): SidebarDisplayMode {
    return config.get('dashboard.sidebar.display', 'persistent');
}