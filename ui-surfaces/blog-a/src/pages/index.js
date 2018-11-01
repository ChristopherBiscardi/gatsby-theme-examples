import React from "react";
import { Link, graphql } from "gatsby";
import get from "lodash/get";
import Helmet from "react-helmet";

import Bio from "gatsby-theme-blog/src/components/Bio";
import Layout from "gatsby-theme-blog/src/components/layout";
import { rhythm } from "gatsby-theme-blog/src/utils/typography";

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const siteDescription = get(
      this,
      "props.data.site.siteMetadata.description"
    );
    const posts = get(this, "props.data.allMarkdownRemark.edges");

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: "en" }}
          meta={[{ name: "description", content: siteDescription }]}
          title={siteTitle}
        />
        Site's index.js
        <Bio />
        {posts.map(({ node }) => {
          const title = get(node, "frontmatter.title") || node.fields.slug;
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4)
                }}
              >
                <Link style={{ boxShadow: "none" }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          );
        })}
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`;
