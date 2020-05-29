import React from 'react';

export default function Authorize() {
  const logged = localStorage.getItem('token') !== '';
  const onLogin = () => {
    localStorage.setItem('token', JSON.stringify({ userName: 'hanmeimei' }));
  };

  return <button onClick={onLogin}> 登录</button>;
}
