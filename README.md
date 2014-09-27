# esnext-loader

[Webpack](http://webpack.github.io) loader for [esnext](https://github.com/esnext/esnext)

[![NPM](http://img.shields.io/npm/v/esnext-loader.svg)](https://www.npmjs.org/package/esnext-loader) [![Build Status](http://img.shields.io/travis/conradz/esnext-loader.svg)](https://travis-ci.org/conradz/esnext-loader)

## Usage

Just use the `esnext` loader to automatically transpile ES6 code.

    npm install --save-dev esnext-loader

Then in any file:

    require('esnext!./file.js');

## Example Configuration

Example `webpack.config.js` file that automatically compiles all `.js` files using `esnext`. See the [webpack loader documentation](http://webpack.github.io/docs/using-loaders.html) for more information.

```js
module.exports = {
    module: {
        loaders: [
            { test: /\.js$/, loader: 'esnext' }
        ]
    }
};
```

You can set `esnext` options by providing query parameters. All esnext options are available except for source map configuration.

```js
// ...
loaders: [
    { test: /\.js$/, loader: 'esnext?class=false' }
]
// ...
```
