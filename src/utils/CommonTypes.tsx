/**
 * Lang mode is the type of languages that will be rendered
 * 
 * If type is array, then the structure of the data will be [name][index][localeCode] = $localeCode
 * If type is object, then the structure of the data will be [name][localeCode] = $localeCode
 */
export type LangModeType = 'array' | 'object';