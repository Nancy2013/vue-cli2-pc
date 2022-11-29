const webpack = require('webpack');
const conf = require('../w-config');
const {
  resolve,
  rmrfSync
} = require('./utils');

rmrfSync('dist/dll');

const dllLibrary = '[name]_Library';

const { buildRoot } = conf.build;

const config = {
  entry: {
    vendor: ['vue', 'vuex',
             'vue-router', 'vuex-router-sync',
             'axios', 'babel-polyfill']
  },
  output: {
    filename: '[name].dll.js',
    path: resolve(buildRoot, 'dll'),
    library: dllLibrary
  },
  resolve: {
    alias: {
      vue$: conf.build.vueModule
    }
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: conf.build.env
    }),
    new webpack.DllPlugin({
      name: dllLibrary,
      path: resolve(buildRoot, 'dll', '[name]-manifest.json'),
      context: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

module.exports = config;
