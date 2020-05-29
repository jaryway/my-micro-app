import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerSubApps } from '../utils/singleSpaHelper';

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

// function registerSubApps(userInfo: any) {
//   console.log('注册子应用', userInfo);
// }

function SecurityLayout({ dispatch, children, currentEmp, loading, globalEventDistributor }: any) {
  // 1、加载菜单信息
  // 2、加载用户信息
  // 2.1 注册子站点并同步用户信息
  const token = localStorage.getItem('token');
  const isLogedIn = token && token !== '';

  useEffect(() => {
    // 没有登录
    if (!isLogedIn) return;
    if (currentEmp && currentEmp.userId) return;

    console.log('加载用户信息');
    dispatch({ type: 'APP_STATUS', payload: true });
    getUserInfo()
      .then((userInfo) => {
        // 加载用户信息成功
        console.log('加载用户信息成功');
        dispatch({ type: 'CURRENT_EMP', payload: userInfo });
        dispatch({ type: 'APP_STATUS', payload: false });
        registerSubApps(globalEventDistributor);
      })
      .catch(() => {
        console.log('加载用户信息出错');
      });
  }, [isLogedIn, currentEmp, dispatch, globalEventDistributor]);

  const redirect = encodeURIComponent(window.location.href);
  console.log('userInfo', currentEmp, loading);

  // 没有登录，去登录
  if (!isLogedIn && window.location.pathname !== '/login') {
    return <Redirect to={`/login?redirect=${redirect}`} />;
  }

  return children;
}

export default connect((state: any) => {
  return { currentEmp: state._root.currentEmp, loading: state._root.loading };
})(SecurityLayout);
