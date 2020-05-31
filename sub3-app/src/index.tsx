import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { Spin } from 'antd';
import RootComponent from './root.component';
import { storeInstance, history } from './Store';

// console.log('process.env.NODE_ENV', process.env.NODE_ENV, process.env.MICRO);

if (process.env.NODE_ENV === 'development' && !process.env.MICRO) {
  // 开发环境直接渲染
  ReactDOM.render(
    <RootComponent
      history={history}
      store={storeInstance}
      globalEventDistributor={storeInstance}
    />,
    document.getElementById('root')
  );
}

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  // loadRootComponent: () => {
  //   return new Promise<any>((resolve) => {
  //     resolve((props: any) => {
  //       return <div {...props}>loading</div>;
  //     });
  //   });
  // },
  rootComponent: (props: any) => {
    return (
      <RootComponent
        history={props.store.history}
        store={props.store.storeInstance}
        globalEventDistributor={props.globalEventDistributor}
      />
    );
  },
  // loadRootComponent: () => {
  //   // console.log('workflow-app.mount.loadRootComponent.initial');
  //   return new Promise((resolve) => {
  //     ensureMount(() =>
  //       resolve((props: any) => {
  //         // console.log('workflow-app.mount.loadRootComponent.appendChild', props);
  //         return (
  //           <RootComponent
  //             history={props.store.history}
  //             store={props.store.storeInstance}
  //             globalEventDistributor={props.globalEventDistributor}
  //           />
  //         );
  //       })
  //     );
  //   });
  // },
  // 可能会有加载顺序的问题
  domElementGetter,
});

function domElementGetter() {
  // Make sure there is a div for us to render into
  let el = document.getElementById('sub3-app');
  if (!el) {
    el = document.createElement('div');
    el.id = 'sub3-app';
    (document.querySelector('#subapp') || { appendChild: (m) => m }).appendChild(el);
  }

  return el;
}

export const bootstrap = [
  (props: any) => {
    console.log('sub3-app-bootstrap', props);
    return Promise.resolve();
  },
  reactLifecycles.bootstrap,
];
export const mount = [reactLifecycles.mount];
export const unmount = [reactLifecycles.unmount];
