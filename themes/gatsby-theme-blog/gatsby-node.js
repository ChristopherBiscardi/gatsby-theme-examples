const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const Debug = require('Debug')

/**
 * When shipping NPM modules, they typically need to be either
 * pre-compiled or the user needs to add bundler config to process the
 * files. Gatsby lets us ship the bundler config *with* the theme, so
 * we never need a lib-side build step.  Since we dont pre-compile the
 * theme, this is how we let webpack know how to process files.
 */
exports.onCreateWebpackConfig = ({ stage, loaders, plugins, actions }) => {
  const debug = Debug('gatsby-theme-blog:onCreateWebpackConfig')
  actions.setWebpackConfig({
    plugins: [
      plugins.provide({
        Emotion: require.resolve('@emotion/core'),
      }),
    ],
  })
  debug('ensuring Webpack will compile theme code')
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.dirname(require.resolve('gatsby-theme-blog')),
          use: [loaders.js()],
        },
      ],
    },
  })
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPreset({
    name: '@babel/preset-react',
    options: { pragma: 'Emotion.jsx' },
  })
  actions.setBabelPlugin({
    name: require.resolve(`babel-plugin-emotion`),
    options: {
      sourceMap: process.env.NODE_ENV !== `production`,
      autoLabel: process.env.NODE_ENV !== `production`,
      hoist: process.env.NODE_ENV === `production`,
    },
  })
}
