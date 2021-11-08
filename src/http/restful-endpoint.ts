import endpoint from './endpoint';
import Is from '@flk/supportive-is';
import { concatRoute } from './../router';

export interface RestfulService {
    route: string,
    list: Function,
    delete: Function,
    get: Function,
    create: Function,
    update: Function,
    publish: Function,
}

export default class RestfulEndpoint implements RestfulService {
    /**
     * Set the main module route
     * i.e /users
     * 
     * @var  {string}
     */
    route = '';

    endpoint = endpoint;

    /**
     * Fetch records from endpoint api
     * 
     * @param   {object} params 
     * @returns {Promise}
     */
    list(params: object = {}, config = {}) {
        config['params'] = params;

        return endpoint.get(this.route, config);
    }

    /**
     * Fetch one record from endpoint api
     * 
     * @param   {number} id 
     * @param   {object} params 
     * @returns {Promise}
     */
    get(id: number | string, params: object = {}, config = {}) {
        if (!config['params']) {
            config['params'] = params;
        }

        return endpoint.get(this.path(id), config);
    }

    /**
     * Concatenate the given path with the base route
     * 
     * @param  {number} id
     * @param  {boolean} published 
     * @returns {Promise} 
     */
    publish(id, published) {
        const data = Is.plainObject(published) ? published : { published };
        return this.patch(id, data);
    }

    /**
     * Concatenate the given path with the base route
     * 
     * @param  {string} path
     * @returns {string} 
     */
    path(...paths) {
        return concatRoute(this.route, ...paths);
    }

    /**
     * Create new record
     * 
     * @param   {object|FormData} data 
     * @returns {Promise}
     */
    create(data, config = {}) {
        return endpoint.post(this.route, data, config);
    }

    /**
     * Update existing record
     * 
     * @param   {number} id 
     * @param   {object|FormData} data 
     * @returns {Promise}
     */
    update(id, data, config = {}) {
        return endpoint.put(this.path(id), data, config);
    }

    /**
     * Delete existing record
     * 
     * @param   {number} id 
     * @returns {Promise}
     */
    delete(id, config = {}) {
        return endpoint.delete(this.path(id), config);
    }

    /**
     * Delete existing record
     * 
     * @param   {number} id 
     * @returns {Promise}
     */
    patch(id, data = {}, config = {}) {
        return endpoint.patch(this.path(id), data, config);
    }
}