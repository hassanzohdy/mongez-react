import React from 'react';
import { currentRoute } from './../../../router';

const SidebarContext = React.createContext({
    currentRoute: currentRoute(),
});

export default SidebarContext;