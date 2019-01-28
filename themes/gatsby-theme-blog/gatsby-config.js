const path = require('path')

module.exports = ({ root }) => ({
  __experimentalThemes: [`gatsby-theme-blog-core`],
  siteMetadata: {
    title: 'Gatsby Starter Blog',
    author: 'Kyle Mathews',
    description: 'A starter blog demonstrating what Gatsby can do.',
    siteUrl: 'https://gatsbyjs.github.io/gatsby-starter-blog/',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.resolve(`./src/assets`),
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: path.resolve(`src/assets/gatsby-icon.png`),
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: path.relative(
          root,
          require.resolve('./src/utils/typography')
        ),
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: require.resolve(`./src/pages`),
      },
    },
  ],
})
