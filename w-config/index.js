/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-04 09:27:57
 * @LastEditTime: 2020-02-27 10:59:20
 * @LastEditors: Please set LastEditors
 */
const path = require('path');

const extraPath = 'web'; // . | web
const publicPath = '';
const distRoot = path.resolve(__dirname, '../dist');
module.exports = {
  build: {
    env: 'production',
    distRoot,
    buildRoot: path.resolve(distRoot, extraPath),
    extraPath,
    browserslist: ['>= 5%', 'last 2 versions', 'ie >=9'],
    vueModule: 'vue/dist/vue.esm.js',
    publicPath: !publicPath && !extraPath ? '' : `${publicPath}${extraPath ? '/' : ''}${extraPath}`,
    bundleAnalyzerReport: process.env.npm_config_report,
  },
  dev: {
    env: 'development',
  },
};
