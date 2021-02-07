import 'reinforcements';
import { hash, queryString } from './router-history.js';
export { BASE_NAME, BASE_URL, default as history } from './router-history.js';
import 'react';
import 'sprintf-js';
import '../localization/locales.js';
import { addRouter, partOf, group } from './routes-list.js';
export { FULL_PAGE } from './routes-list.js';
import '@flk/supportive-is';
import 'object-query-string';
import 'react-dom';
import 'react-router-dom';
export { default as Renderer } from './renderer.js';
export { default as setCurrentLocale } from './update-current-localization.js';

var router = {
    add: addRouter,
    partOf,
    group,
    hash,
    get queryString() {
        return queryString();
    }
};

export default router;
