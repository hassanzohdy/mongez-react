export interface RestfulService {
    route: string;
    list: Function;
    delete: Function;
    get: Function;
    create: Function;
    update: Function;
    publish: Function;
}
export default class RestfulEndpoint implements RestfulService {
    /**
     * Set the main module route
     * i.e /users
     *
     * @var  {string}
     */
    route: string;
    endpoint: import("axios").AxiosInstance;
    /**
     * Fetch records from endpoint api
     *
     * @param   {object} params
     * @returns {Promise}
     */
    list(params?: object): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Fetch one record from endpoint api
     *
     * @param   {number} id
     * @param   {object} params
     * @returns {Promise}
     */
    get(id: number | string, params?: object): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Concatenate the given path with the base route
     *
     * @param  {number} id
     * @param  {boolean} published
     * @returns {Promise}
     */
    publish(id: any, published: any): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Concatenate the given path with the base route
     *
     * @param  {string} path
     * @returns {string}
     */
    path(...paths: any[]): string;
    /**
     * Create new record
     *
     * @param   {object|FormData} data
     * @returns {Promise}
     */
    create(data: any): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Update existing record
     *
     * @param   {number} id
     * @param   {object|FormData} data
     * @returns {Promise}
     */
    update(id: any, data: any): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Delete existing record
     *
     * @param   {number} id
     * @returns {Promise}
     */
    delete(id: any): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Delete existing record
     *
     * @param   {number} id
     * @returns {Promise}
     */
    patch(id: any, data?: {}): Promise<import("axios").AxiosResponse<any>>;
}
