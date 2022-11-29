/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-04 09:27:57
 * @LastEditTime: 2019-07-04 09:27:57
 * @LastEditors: your name
 */
const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const devConfigFn = require('./webpack.dev.config');
const { build } = require('../w-config');

const { buildRoot } = build;

module.exports = () =>
  devConfigFn({ server: true }).then(config =>
    merge(config, {
      plugins: [new webpack.HotModuleReplacementPlugin()],
      devServer: {
        contentBase: resolve(buildRoot, '..'),
        hot: true,
        noInfo: true,
        stats: 'errors-only',
        open: true,
        openPage: `${build.extraPath}/index.html`,
        proxy: [
          {
            context: ['/v1'], // 路径前缀
            target: 'http://10.10.30.70:9989', // 服务器ip
            changeOrigin: true,
            logLevel: 'debug',
          },
        ],
      },
    }));
