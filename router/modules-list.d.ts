export interface ModuleInfo {
    module: string;
    entry: string[];
    load?: Function;
    appProvider?: Function;
}
export interface Module {
    path: string;
    name: string;
    modules: ModuleInfo[];
}
export interface ModulesList {
    [key: string]: ModuleInfo;
}
declare const modulesList: ModulesList;
/**
 * Create modules list for all available applications
 *
 * @param  {array} modules
 * @returns {void}
 */
export declare function setModules(modules: Array<Module>): void;
export default modulesList;
