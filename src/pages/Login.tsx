import React from 'react';

function LoginPage({ history }: any) {
  function login() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const token = { access_token: 'access_token_xxxxxxxxxxxxxx' };
        resolve({ token });
      }, 1000);
    }).then((token) => {
      localStorage.setItem('token', JSON.stringify(token));

      history.replace('/home');
    });
  }

  return (
    <div>
      <p>你还没有登录，请登录！</p>
      <button onClick={login}>登录</button>
    </div>
  );
}

export default LoginPage;
