/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-04 09:27:57
 * @LastEditTime: 2019-09-23 19:47:05
 * @LastEditors: Please set LastEditors
 */
const {
  resolve
} = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const {
  getEnv,
  postcssCfg,
  scssLoader,
  lessLoader,
  vueCSSLoaders,
} = require('./utils');

const {
  build
} = require('../w-config');

const getAlias = require('./alias');

const CURRENT_ENV = getEnv();
function genConfig() {
  const srcRoot = resolve(__dirname, '../src');
  const { buildRoot } = build;
  const useExtractTextPlugin = CURRENT_ENV.isProd;

  const entries = { app: resolve(srcRoot, 'app.js') };
  const htmlTpls = [
    new HtmlWebpackPlugin({
      title: 'MyApp',
      filename: 'index.html',
      template: resolve(srcRoot, 'index.html'),
    })
  ];


  const config = {
    entry: entries,
    output: {
      filename: 'scripts/[name].[chunkhash].js',
      chunkFilename: 'scripts/[id].[chunkhash].js',
      path: buildRoot,
      publicPath: `${build.publicPath}/`
    },
    resolve: {
      extensions: ['.js', '.json', '.vue', '.jsx'],
      alias: getAlias()
    },
    module: {
      rules: [{
        test: /\.js(x)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: postcssCfg,
          loaders: vueCSSLoaders(useExtractTextPlugin)
        },
        exclude: /node_modules/
      }, {
        test: /\.(s)?css$/,
        use: scssLoader(useExtractTextPlugin)
      }, {
        test: /\.less$/,
        use: lessLoader(useExtractTextPlugin)
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }]
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: resolve(__dirname, '..', 'static/**/*'),
          to: buildRoot,
        },
      ]),
      ...htmlTpls,
    ]
  };

  if (useExtractTextPlugin) {
    config.plugins = config.plugins || [];
    config.plugins.push(new ExtractTextPlugin({
      filename: 'styles/[name].css',
      allChunks: true
    }));
  }
  if (build.bundleAnalyzerReport) {
    config.plugins = config.plugins || [];
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  return config;
}

module.exports = () => Promise.resolve(genConfig());
