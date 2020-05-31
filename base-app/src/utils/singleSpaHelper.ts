// const System = window.System;

import * as singleSpa from 'single-spa';
import { GlobalEventDistributor } from '../GlobalEventDistributor';

export interface AppConfigProps {
  name: string;
  // main: { css: string[]; js: string[] };
  entrypoints: { main: string[]; store?: string[] };
  prefix: string | string[];
  store: string;
  base: boolean;
}
interface StoreModuleProps {
  storeInstance?: any;
  history?: any;
}

interface CustomProps {
  store?: StoreModuleProps;
  globalEventDistributor: GlobalEventDistributor;
}

export async function registerSubApps(globalEventDistributor: GlobalEventDistributor) {
  const { deployApps } = window;
  console.log('registerSubApps');
  if (!deployApps || !deployApps.length) {
    throw new Error('项目配置错误：缺乏 deployApps 配置');
  }

  await Promise.all(
    deployApps.map((m) =>
      window.System.import(`/${m}/project.json`)
        .then((m: any) => m.default)
        .then(async (appConfig: AppConfigProps) => {
          await registerApp(appConfig, globalEventDistributor);
        })
        .catch(() => ({}))
    )
  ).then(() => {});

  console.log('registerSubApps-ok');
  // 所有 store 加载完，再统一更新一下 userInfo 和 menuInfo
  // todo:

  singleSpa.start();
}

// eslint-disable-next-line no-unused-vars
export async function registerApp(
  app: AppConfigProps,
  globalEventDistributor: any,
  _appName?: string
) {
  // 导入store模块
  let storeModule: StoreModuleProps = { storeInstance: undefined, history: undefined };
  const customProps: CustomProps = { globalEventDistributor: globalEventDistributor };
  console.log('register', app);
  // 尝试导入store
  try {
    storeModule = app.entrypoints.store
      ? await loadResources(app.entrypoints.store).then((m: any) => ({
          ...storeModule,
          ...m,
        }))
      : storeModule;
  } catch (e) {
    console.log(`Could not load store of app ${app.name}.`, e);
    // 如果失败则不注册该模块
    return;
  }
  // 注册应用于事件派发器
  if (storeModule.storeInstance && globalEventDistributor) {
    // 注册到全局
    globalEventDistributor.registerStore(storeModule.storeInstance);
  }

  // 准备自定义的props,传入每一个单独工程项目
  customProps.store = storeModule;

  singleSpa.registerApplication(
    app.name,
    async () => {
      globalEventDistributor &&
        globalEventDistributor.dispatch({ type: 'SUB_APP_LOADING', payload: true });
      // console.log('xxxxxxxxxxx', app.entrypoints.main);
      // console.log(`${app.name} is loading.`, app.entrypoints.main);
      return await loadResources(app.entrypoints.main).then((resp) => {
        globalEventDistributor &&
          globalEventDistributor.dispatch({ type: 'SUB_APP_LOADING', payload: false });
        // console.log(`${app.name} has been loaded.`);
        return resp;
      });
    },
    checkActive(app.prefix),
    customProps
  );

  return await Promise.resolve().then(() => {
    console.log('register-end', app);
  });
}

/**
 * 加载资源文件
 * @param resources
 * @param appName
 */
async function loadResources(resources: string[], appName?: string) {
  let starter: any;

  for (let i = 0; i < resources.length; i++) {
    console.log('singleSpa-loadResources', resources[i]);
    if (!resources[i].endsWith('.hot-update.js'))
      starter = await window.System.import(`${appName ? `/${appName}` : ''}${resources[i]}`);
    // console.log('singleSpa-loadResources4', starter);
  }

  // console.log('singleSpa-loadResources', starter);
  return Promise.resolve(starter);
}
//
export function checkActive(prefix: string | string[], mode: 'Browser' | 'Hash' = 'Browser') {
  return function (location: any) {
    // console.log('checkActive', location);
    //如果该应用 有多个需要匹配的路径
    const pathname = mode === 'Browser' ? location.pathname : location.hash;
    // console.log('checkActive', prefix, pathname, window.location.pathname);
    if (typeof prefix !== 'string') return prefix.some((m) => pathname.startsWith(`#${m}`));
    // 普通情况
    return pathname.startsWith(`${prefix}`);
  };
}
