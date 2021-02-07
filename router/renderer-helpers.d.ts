import { ModuleInfo } from "./modules-list";
/**
 * Check if the given firstSegment is part of modules list
 *
 * @param   {object} firstSegment
 * @returns
 */
export declare function isPartOfLazyModules(firstSegment: string): ModuleInfo;
/**
 * Get first segment of the given location data
 *
 * @param   {object} location
 * @returns {string}
 */
export declare function firstSegmentOfRoute(location: Location): string;
