import 'reinforcements';
export { default as config } from './config/index.js';
import './router/router-history.js';
import 'sprintf-js';
import './localization/locales.js';
import './router/routes-list.js';
import '@flk/supportive-is';
import 'object-query-string';
import './router/renderer.js';
import scan from './router/scanner.js';
import './router/update-current-localization.js';
import bootstrap from './bootstrap/index.js';
export { default as cache } from './cache/index.js';
export { default as Globals } from './globals/index.js';

function Mongez() {
    bootstrap();
    // start router scanner
    scan();
}

export default Mongez;
