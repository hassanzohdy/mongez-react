export type TimeAgoConfiguration = {
    /**
     * Time Ago Base key
     */
    timeAgo?: {
        /**
         * List of formatters
         */
        formatters?: {
            /**
             * Locale Code: formatter function
             * 
             * @see https://www.npmjs.com/package/react-timeago#usage-1
             */
            [localeCode: string]: Function;
        }
    }
}