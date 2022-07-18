const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  // mode defaults to 'production' if not set
  mode,

  entry: {
    bundle: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
    // this places all images processed in an image folder
    assetModuleFilename: 'assets/[name][ext][query]',
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,

        type: 'asset/resource',
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          // could replace the next line with "style-loader" here for inline css
          {
            loader: MiniCssExtractPlugin.loader,
            // This is required for asset imports in CSS, such as url()
            options: { publicPath: '' },
          },
          'css-loader',
          'postcss-loader',
          // according to the docs, sass-loader should be at the bottom, which
          'sass-loader',
        ],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // without additional settings, this will reference .babelrc
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(__dirname, 'dist'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
      ],
    }),
  ],

  devtool: 'source-map',

  // required if using webpack-dev-server
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
};
