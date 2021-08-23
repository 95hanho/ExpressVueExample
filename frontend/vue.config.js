module.exports = {
  devServer: {
    // api요청이 있을때 어디에서 처리할지를 설정
    proxy: {
      "/api": {
        target: "http://localhost:3000/api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  outputDir: "../nodeVue/public",
};
