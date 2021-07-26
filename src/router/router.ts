import { queryString, hash } from './router-history';
import { addRouter, partOf, group } from './routes-list';

const router = {
    add: addRouter,
    partOf,
    group,
    hash,
    get queryString() {
        return queryString();
    }
};

export default router