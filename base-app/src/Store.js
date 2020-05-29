import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createBrowserHistory as createHistory } from 'history';
import thunk from 'redux-thunk';
import { createPromise } from 'redux-promise-middleware';

// import httpMiddleware from './middleware/httpMiddleware';

export const history = createHistory();
// const moduleHotFile = './_global/reducers/index.js';
const initialState = { refresh: 0 };
const initialState1 = { mountApps: [] };
const middlewares = [thunk, createPromise({ promiseTypeDelimiter: '/' }) /*, httpMiddleware*/];
let devtools = () => (noop) => noop;

if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__;
}

const enhancers = [
  applyMiddleware(...middlewares),
  devtools(window.__REDUX_DEVTOOLS_EXTENSION__OPTIONS),
];

function render(state = initialState, action) {
  switch (action.type) {
    case 'REFRESH': {
      // console.log('REFRESH-base', action);
      return { ...state, refresh: state.refresh + 1 };
    }
    default:
      return state;
  }
}

function to(state = initialState, action) {
  if (action.type !== 'to' && action.owner !== 'base') return { ...state, path: action.path };
  history.replace(action.path);

  return { ...state, path: action.path };
}

function mount(state = initialState1, action) {
  if (action.type === 'WILL_MOUNT') {
    console.log('base-app.willMount', action, state);
    return { ...state, mountApps: [...state.mountApps, action.payload.mount] };
  }

  if (action.type === 'DID_MOUNT') {
    const { mountApps } = state;
    console.log('base-app.didMount', action, mountApps);

    for (let i = 0; i < mountApps.length; i++) {
      const mountApp = mountApps[i];
      mountApp();
    }

    return { ...state, mountApps: [] };
  }

  return state;
}

// APPSTATUS- 未登录=''、正在登录=LOGINGIN、已登录=LOGGEDIN
function _root(
  state = { registerApps: [], rootActiveMenuKey: '', appStatus: '', rootMenuList: [] },
  action
) {
  // 注册子 App
  if (action.type === 'REGISTER_APP') {
    console.log('base-app.REGISTER_APP', action, state);
    // 注册子 APP 的时候，如果已经登录了，直接 mount
    if (state.appStatus === 'READY') {
      action.payload.mount();
      return state;
    }

    return { ...state, registerApps: [...state.registerApps, action.payload] };
  }
  // 挂载子 App base-app 挂载并获取好用户信息后，把待挂载的其他应用挂载上
  if (action.type === 'CHANGE_APP_STATUS') {
    const { registerApps } = state;
    console.log('base-app.CHANGE_APP_STATUS', action, registerApps);
    if (action.payload === 'READY') {
      for (let i = 0; i < registerApps.length; i++) {
        const registerApp = registerApps[i];
        registerApp.mount();
      }
    }

    return { ...state, registerApps: [], appStatus: action.payload };
  }

  if (action.type === 'CURRENT_EMP') {
    return { ...state, currentEmp: action.payload };
  }

  if (action.type === 'APP_STATUS') {
    return { ...state, loading: action.payload };
  }

  if (action.type === 'ROOT_MENU_LIST') {
    console.log('ROOT_MENU_LIST', action.payload);
    return { ...state, rootMenuList: action.payload };
  }

  if (action.type === 'ROOT_ACTIVE_MENU_KEY') {
    console.log('ROOT_ACTIVE_MENU_KEY', action.payload);
    return { ...state, rootActiveMenuKey: action.payload || [] };
  }
  return state;
}

const globalReducers = { namespace: () => 'base', render, to, _root };

export const storeInstance = createStore(
  combineReducers(globalReducers),
  {},
  compose(...enhancers)
);
storeInstance.globalReducers = globalReducers;
// console.log('storeInstance', storeInstance);
// 适配 热更新
// if (module.hot && moduleHotFile) {
//   module.hot.accept(moduleHotFile, () => {
//     console.log('module.hot.accept');
//     const reducers = { ...storeInstance.globalReducers, ...(storeInstance.injectedReducers || {}) };
//     storeInstance.replaceReducer(combineReducers(reducers));
//   });
// }
