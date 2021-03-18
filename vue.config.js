const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
process.env.VUE_APP_VERSION = "V" + require("./package.json").version;

module.exports = {
  // porduction正式环境 test测试环境
  publicPath: process.env.VUE_APP_BASE_URL,
  // 输出文件目录
  outputDir: process.env.VUE_APP_OUTPUT_DIR,
  assetsDir: "./static",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,

  chainWebpack: config => {
    config.resolve.alias.set("api", path.resolve("./src/api/index.ts"));
    config.plugin("provide").use(webpack.ProvidePlugin, [
      {
        api: "api",
        "@": path.resolve(__dirname, "./src")
      }
    ]);
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    // 压缩代码
    config.optimization.minimize(true);
    // 分割代码
    config.optimization.splitChunks({
      chunks: "all"
    });

    // #region 启用GZip压缩
    // if (process.env.NODE_ENV === "production") {
    //   config
    //     .plugin("compression")
    //     .use(CompressionPlugin, {
    //       asset: "[path].gz[query]",
    //       algorithm: "gzip",
    //       test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
    //       threshold: 10240,
    //       minRatio: 0.8,
    //       cache: true
    //     })
    //     .tap(args => {});
    // }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  pwa: {
    iconPaths: {
      favicon32: "./favicon.ico",
      favicon16: "./favicon.ico",
      appleTouchIcon: "./favicon.ico",
      maskIcon: "./favicon.ico",
      msTileImage: "./favicon.ico"
    }
  },
  devServer: {
    host: "localhost",
    port: 8086,
    https: false,
    hotOnly: false
    // 设置代理
  },

  productionSourceMap: false,
  // 第三方插件配置
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        //这个是加上自己的路径，
        path.resolve(__dirname, "./src/assets/less/module/var.less")
      ]
    }
  }
};
