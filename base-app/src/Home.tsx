import React from 'react';

import { Route, Switch, Link } from 'react-router-dom';
import { Button,Spin } from 'antd';
import User from './pages/User';
import Car from './pages/Car';
import Coffee from './pages/Coffee';

export default function Home({ match, history }: any) {
  return (
    <div id='subapp'>
      <Switch>
        <Route path={`${match.path}user`} component={User} />
        <Route path={`${match.path}car`} component={Car} />
        <Route path={`${match.path}coffee`} component={Coffee} />
        {/* 如果命中子站点路由，不进入 not found 页面 */}
        <Route
          path={['/*-app', '/sub1', '/sub2', '/sub3']}
          render={() => {
            // console.log('sub-app', defaultUrl, '命中子站点路由');
            return <Spin />;
          }}
        />
        <Route
          render={() => {
            return <div>home</div>;
          }}
        />
      </Switch>
    </div>
  );
}
