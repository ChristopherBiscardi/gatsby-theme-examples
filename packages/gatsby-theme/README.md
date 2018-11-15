# Gatsby Theme

Helper functions for building [Gatsby
Themes](https://www.gatsbyjs.org/blog/2018-11-11-introducing-gatsby-themes/).

# withThemePath

Takes a relative path. Uses the file at `$UserSite/$RelativePath` if
it exists. If it doesn't, falls back to `$Theme/$RelativePath`

```javascript
import { withThemePath } from "gatsby-theme";

createPage({
  path: post.node.fields.slug,
  component: withThemePath("./src/templates/blog-post.js"),
  context: {
    slug: post.node.fields.slug,
    previous,
    next
  }
});
```
