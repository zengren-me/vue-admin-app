module.exports = {
  css: {
    loaderOptions: { // 向webpack的预处理器loader传递选项
      less: {
        javascriptEnabled: true,
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-admin-app/' : '/',
};
