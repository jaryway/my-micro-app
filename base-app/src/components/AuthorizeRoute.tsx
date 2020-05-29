import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { RouteProps } from 'react-router-dom';

interface AuthorizeRouteProps extends RouteProps {}

function AuthorizeRoute({ path, component, render }: AuthorizeRouteProps) {
  console.log('AuthorizeRoute');
  // 从本地存储中获取 token 信息
  const token = localStorage.getItem('token');

  // 没有 token 信息，则用户为登录，去登录页面登录
  if (!token) return <Redirect to='login' />;

  return <Route path={path} component={component} render={render} />;
}

export default AuthorizeRoute;
