import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
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

// function ensureMount(cb: any) {
//   let timer: any = 1;

//   const callback = () => {
//     if (document.querySelector('#subapp')) {
//       console.log('workflow-app.mount.ensureMount');
//       clearInterval(timer);
//       timer = 0;
//       cb();
//     }
//   };

//   // 进来先执行一次查找，如果找到直接mount，否则轮询一下
//   callback();

//   timer && (timer = setInterval(callback, 1));
//   // 不管如何 3s 钟后都取消定时器
//   setTimeout(() => {
//     console.log('workflow-app.mount.ensureMount', '定时器被取消了');
//     clearInterval(timer);
//     timer = 0;
//   }, 3000);
// }

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
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
  let el = document.getElementById('sub1-app');
  if (!el) {
    el = document.createElement('div');
    el.id = 'sub1-app';
    (document.querySelector('#subapp') || { appendChild: (m) => m }).appendChild(el);
  }

  return el;
}

export const bootstrap = [
  (props: any) => {
    // console.log('sub1-app-bootstrap', props);
    return Promise.resolve();
  },
  reactLifecycles.bootstrap,
];
export const mount = [reactLifecycles.mount];
// export async function mount(props: any) {
//   const { globalEventDistributor } = props;
//   const { base: baseState } = globalEventDistributor.getState();
//   const { _root } = baseState;
//   console.log('workflow-app.mount.initital', baseState);
//   /* Note：
//    * 这里要确保 mount 的时候 account 信息已经加载好
//    */

//   // 如果 base 的用户信息已经加载好，直接 mount app；
//   // 否则 dispatch 一下，会在 currentEmp 加载好后执行mount
//   const baseAppIsOk = _root && _root.currentEmp && !!_root.currentEmp.id;

//   if (baseAppIsOk) {
//     console.log('workflow-app.mount.mount_app1', baseState);
//     return reactLifecycles.mount(props);
//   }

//   return new Promise((resolve) => {
//     console.log('workflow-app.mount.register_app', baseState);

//     globalEventDistributor.dispatch({
//       type: 'REGISTER_APP',
//       payload: {
//         mount: () => {
//           console.log('workflow-app.mount.mount_app2', baseState);
//           resolve(reactLifecycles.mount(props));
//         },
//       },
//     });
//   });
// }
export const unmount = [reactLifecycles.unmount];
