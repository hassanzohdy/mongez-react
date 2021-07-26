export type LocaleCodes = {
    locales?: {
        /**
         * Locale Code name as the object head
         */
        [localeCode: string]: {
            /**
             * Locale Direction
             */
            direction: 'ltr' | 'rtl',
            /**
             * Language Name i.e English | العربية
             * Its recommended to write down the language name in its original language
             */
            name: string;
            /**
             * Locale Code flag image path, it can be local path by importing the image or an external url
             */
            flag?: string;
        }
    };
}