import React from "react";
import { Link } from "gatsby";
import { css, Styled, Flex } from "theme-ui";

import Bio from "gatsby-theme-blog/src/components/bio";

const Footer = ({ previous, next }) => (
  <footer
    css={css({
      mt: 4,
      pt: 3
    })}
  >
    <Styled.hr />I override the post footer!
  </footer>
);

export default Footer;
