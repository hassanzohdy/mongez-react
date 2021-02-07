declare const endpoint: import("axios").AxiosInstance;
/**
 * Get last request
 * This function MUST BE called directly after sending the request so we can cancel the
 * last ajax request, and also to get any info we need about it as well
 *
 * @returns {object}
 */
export declare const lastRequest: () => {
    cancelToken: import("reinforcements/src/contracts/object-interface").default;
    abort(): void;
};
export default endpoint;
