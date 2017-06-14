

# AngularJs Starter (simplified version of NG6)

> The de facto starter repo for building scalable apps with [Angular](https://angularjs.org), [ES6](https://git.io/es6features), and [Webpack](http://webpack.github.io/)

This repo serves as a minimal starter for those looking to get up-and-running with Angular and ES6, using [Webpack](http://webpack.github.io/) for the build process.

## Build System

`Webpack` handles all file-related concerns:
* Transpiling from ES6 to ES5 with `Babel`
* Loading HTML files as modules
* Transpiling stylesheets and appending them to the DOM
* Refreshing the browser and rebuilding on file changes
* Hot module replacement for transpiled stylesheets
* Bundling the app
* Loading all modules
* Doing all of the above for `*.spec.js` files as well


# Getting Started
## Dependencies
Tools needed to run this app:
* `node` and `npm`(or `yarn`)

## Installing
* `fork` this repo
* `clone` your fork
* `npm install` to install dependencies

## Running the App
`npm start` will run `webpack-dev-server`

### Tasks
Here's a list of available tasks:
*  `npm run build`
*  `npm start`
*  `npm test`

### Testing
To run the tests, run `npm test`.