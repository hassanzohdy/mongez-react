import { HttpConfig } from "../http";
import { LocaleCodes } from "../localization";
import { FormConfigSettings } from "./../form";
import { LangModeType } from "./../utils/CommonTypes";
import { CacheSettings } from "../cache/CacheSettings";
import { RouterConfigurations } from "../router/types";
import { AdminDashboardSettings } from "../admin/utils/types";
import { TimeAgoConfiguration } from "../components/config-types";
import { EncryptionSettings } from "../encryption/EncryptionSettings";

export type ConfigList = RouterConfigurations & HttpConfig & LocaleCodes & FormConfigSettings & CacheSettings & EncryptionSettings & AdminDashboardSettings & TimeAgoConfiguration & {
    /**
    * Lang mode is the type of languages that will be rendered
    * 
    * If type is array, then the structure of the data will be [name][index][localeCode] = $localeCode
    * If type is object, then the structure of the data will be [name][localeCode] = $localeCode
    */
    langMode?: LangModeType;
    /**
     * Generic Other Config Settings
     */
    [id: string]: any;
} & {};