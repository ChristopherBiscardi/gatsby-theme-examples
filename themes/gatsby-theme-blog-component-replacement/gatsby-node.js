const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const fs = require('fs')
const withThemePath = require('./with-theme-path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = withThemePath('./src/templates/blog-post.js')

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

// themePrefix is a machine generated name that uniquely identifies the theme for import paths
const themePrefix = 'gatsby-theme-blog-component-replacement--components'
exports.onCreateWebpackConfig = ({ actions }) => {
  const userComponents = fs
    .readdirSync(path.resolve(`./src/components/${themePrefix}`))
    .reduce(
      (acc, componentName) => ({
        ...acc,
        [`${themePrefix}/Bio`]: path.resolve(
          `./src/components/${themePrefix}/${componentName}`
        ),
      }),
      {}
    )
  actions.setWebpackConfig({
    resolve: {
      alias: {
        // alias order matters. User's first. fallback second
        ...userComponents,
        [themePrefix]: path.join(__dirname, './src/components'),
      },
    },
  })
}
