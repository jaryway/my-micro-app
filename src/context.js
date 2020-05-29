import React from 'react';

const key = 'default_menu_collapsed';
let defaultMenuCollapsed = window.localStorage.getItem(key);
defaultMenuCollapsed = defaultMenuCollapsed || false;

// menuCollapsed: defaultMenuCollapsed == "false" ? false : true,

export const ApplicationContext = React.createContext({
  collapsed: defaultMenuCollapsed === 'false' ? false : true,
  toggleCollapsed: () => {
    console.log('toggleCollapsed');
  },
});
