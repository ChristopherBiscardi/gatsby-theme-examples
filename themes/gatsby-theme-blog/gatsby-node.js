const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const fs = require('fs')
const mkdirp = require('mkdirp')
const Debug = require('Debug')

exports.createPages = ({ graphql, actions }) => {
  const debug = Debug('gatsby-theme-blog:createPages')
  const { createPage } = actions
  const blogPost = require.resolve('./src/templates/blog-post.js')

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges

        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          debug('creating', post.node.fields.slug)
          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

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

// make sure src/pages exists for the filesystem source or it will error
exports.onPreBootstrap = ({ store }) => {
  const debug = Debug('gatsby-theme-blog:onPreBoostrap')
  const { program } = store.getState()
  const dir = `${program.directory}/src/pages`
  debug(`ensuring ${dir} exists`)

  if (!fs.existsSync(dir)) {
    debug(`creating ${dir}`)
    mkdirp.sync(dir)
  }
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
