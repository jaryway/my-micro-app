const { createProxyMiddleware } = require('http-proxy-middleware');

const deployAppsProxy = {
  // '/base-app': { target: 'http://localhost:3801/', pathRewrite: { '^/base-app': '' } },
  '/sub1-app': { target: 'http://localhost:5301/' },
  '/sub2-app': { target: 'http://localhost:5302/' },
  '/sub3-app': { target: 'http://localhost:5303/' },
  // '/knowledge-app': { target: 'http://localhost:3804/', pathRewrite: { '^/knowledge-app': '' } },
  // '/profile-app': { target: 'http://localhost:3805/', pathRewrite: { '^/profile-app': '' } },
  // '/punch-app': { target: 'http://localhost:3806/', pathRewrite: { '^/punch-app': '' } },
  // '/schedule-app': { target: 'http://localhost:3807/', pathRewrite: { '^/schedule-app': '' } },
  // '/notice-app': { target: 'http://localhost:3808/', pathRewrite: { '^/notice-app': '' } },
  // '/meeting-app': { target: 'http://localhost:3809/', pathRewrite: { '^/meeting-app': '' } },
  // '/box-app': { target: 'http://localhost:3810/', pathRewrite: { '^/box-app': '' } },
  // '/ssmp-app': { target: 'http://localhost:3811/', pathRewrite: { '^/ssmp-app': '' } },
  // '/homepage-app': { target: 'http://localhost:3812/', pathRewrite: { '^/homepage-app': '' } },
  // '/portal-app': { target: 'http://localhost:3813/', pathRewrite: { '^/portal-app': '' } },
};

module.exports = function (app) {
  console.log('setupProxy');
  Object.entries(deployAppsProxy).forEach(([k, v]) => {
    app.use(
      k,
      createProxyMiddleware(v)
      //   createProxyMiddleware({
      //     target: 'http://localhost:5000',
      //     changeOrigin: true,
      //   })
    );
  });
};
