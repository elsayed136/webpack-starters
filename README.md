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
