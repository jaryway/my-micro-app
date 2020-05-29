import React from 'react';

import { Route, Switch, Link } from 'react-router-dom';
import User from './pages/User';
import Car from './pages/Car';
import Coffee from './pages/Coffee';

function getUserInfo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() * 10 === 9) {
        return reject();
      }
      resolve({ userId: 'xiaoming', userName: '黄小暧' });
    }, 3000);
  });
}

function registerSubApps(userInfo: any) {
  console.log('注册子应用', userInfo);
}

export default function Home({ match, history }: any) {
  console.log('home', match, history);
  // // 1、加载菜单信息
  // // 2、加载用户信息
  // // 2.1 注册子站点并同步用户信息
  // getUserInfo()
  //   .then((userInfo) => {
  //     registerSubApps(userInfo);
  //   })
  //   .catch(() => {
  //     console.log('加载用户信息出错');
  //   });

  return (
    <div style={{ padding: 24 }}>
      <div>
        <ul>
          <li>
            <Link to='/user'>用户</Link>
          </li>
          <li>
            <Link to='/car'>车辆</Link>
          </li>
          <li>
            <Link to='/coffee'>咖啡</Link>
          </li>
          <li>
            <Link to='/sub1'>sub1-app</Link>
          </li>
        </ul>
      </div>
      <div id='subapp'>
        <Switch>
          <Route path={`${match.path}user`} component={User} />
          <Route path={`${match.path}car`} component={Car} />
          <Route path={`${match.path}coffee`} component={Coffee} />
          {/* 如果命中子站点路由，不进入 not found 页面 */}
          <Route
            path={['/*-app', '/sub1', '/portal', '/box']}
            render={() => {
              // console.log('sub-app', defaultUrl, '命中子站点路由');
              return <div />;
            }}
          />
          <Route
            render={() => {
              return <div>home</div>;
            }}
          />
        </Switch>
      </div>
    </div>
  );
}
