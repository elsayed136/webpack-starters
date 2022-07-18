# Webpack Starters for reference

A collection of different Webpack setups for quick referencing or starting from.

Each branch has a different setup for the named purpose, such as typescript showing a TypeScript variation.

## Start using for a new project, or playground

1. Clone the repo
2. Select the branch you want
3. Run npm i to install dependencies
4. Run one of the following commands, depending on intent:

### Production Build

```bash
npm run build
```

### Development Build

```bash
npm run build-dev
```

### Development Build, watching for file changes

```bash
npm run watch
```

### Development Server on port :8080

```bash
npm start
```

## Tutorials

### 1. webpack initail setup

```bash
npm init -y
npm i -D webpack webpack-cli webpack-dev-server
```

then create entry point `src/index.js`

and added the `webpack.config.js` file to the root path

```bash
# ./webpack.config.js
const path = require('path');
const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
  },
  devtool: false,
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
}
```

### 2. Babel

```bash
npm i -D babel-loader @babel/core @babel/preset-env
```

then add this to `webpack.config.js` file

```bash
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        // options: {
        //   presets: [['@babel/preset-env', { targets: 'defaults' }]],
        // },
      }
    }
  ]
}
```

you can uncomment the presets in the code above or
create file `babel.config.js` then add

```bash
# ./babel.config.js
module.exports = {
  presets: ['@babel/preset-env'],
}
```

### 3. CSS-PostCSS-SASS-HMR

```bash
npm i -D style-loader css-loader
npm i -D postcss postcss-preset-env postcss-loader
npm i -D sass sass-loader
```

in `webpack.config.js` file

add rule for styles

```bash
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // This is required for asset imports in CSS, such as url()
            options: { publicPath: '' },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'],
      },
    ],
  },

  plugins: [new MiniCssExtractPlugin()],
};
```

create file `postcss.config.js` then add

```bash
# ./postcss.config.js
module.exports = {
  plugins: ['postcss-preset-env'],
}
```

### 4. html-webpack-plugin

```bash
npm i -D html-webpack-plugin html-webpack-harddisk-plugin
```

NOTE: html-webpack-harddisk-plugin for hot reloading html template from html-webpack-plugin

in `webpack.config.js` file

add in src driectory html tamplete for HtmlWebpackPlugin

```bash
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(__dirname, 'dist'),
    }),
  ]
};
```

### 5. Assets/Images

```bash
npm i -D copy-webpack-plugin
```

NOTE: copy-webpack-plugins: Copies individual files or entire directories, which already exist, to the build directory.

in `webpack.config.js` file

add in src driectory html tamplete for HtmlWebpackPlugin

```bash
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
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
    ],
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
      ],
    }),
  ]
};
```

### 6. Browserslists

in root dir add file `.browserslistrc`

```bash
# ./.browserslistrc
last 2 versions
> 0.5%
IE 10
```
