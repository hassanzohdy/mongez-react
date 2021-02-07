import 'reinforcements';
import '../../../router/router-history.js';
import React from 'react';
import 'sprintf-js';
import '../../../localization/locales.js';
import '../../../router/routes-list.js';
import { currentRoute } from '../../../router/navigator.js';
import 'react-dom';
import 'react-router-dom';
import '../../../router/renderer.js';
import '../../../router/update-current-localization.js';

const SidebarContext = React.createContext({
    currentRoute: currentRoute(),
});

export default SidebarContext;
