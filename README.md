# TS Grid - Grid

A base theme for a Drupal 8 site using CSS Grid Layout, Webpack, and JS ES6.
Requires Ruby to run locally and the
[components](https://www.drupal.org/project/components) module to be added to
the project build.

Check out the Wiki to learn more about this theme:
https://github.com/thinkshout/ts_grid/wiki

## Setup and use

- Run `npm install` to install dependencies.
- Run `npm run build` to run the production build.
- Run `npm run build:dev` to run the development build. Do not commit changes
  from development mode!
- Run `npm run start` to watch for changes and build.
- Run `npm run start:dev` to watch for changes and build in development mode.
  In this mode, your local site should automatically refresh when files change.
  Do not commit changes from development mode!
- Run `npm run prettier` to fix styling errors in js/scss files. This is ran
  automatically if you commit files while inside the theme directory.

## Javascript compilation

Javascript is transpiled from ES6 ES5 using Babel, and then minified and
tree-shook by Webpack.

For more information on ES6, see https://dev.to/srebalaji/es6-for-beginners-with-example-c7
