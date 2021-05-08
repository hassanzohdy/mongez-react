export type EncryptionSettings = {
    /**
     * Encryption Settings
     */
    encryption?: {
        /**
         * Encryption key
         */
        key?: string;
        /**
         * Encryption Algorithm
         * 
         * @see https://www.npmjs.com/package/crypto-js
         */
        algorithm?: any;
    }
};