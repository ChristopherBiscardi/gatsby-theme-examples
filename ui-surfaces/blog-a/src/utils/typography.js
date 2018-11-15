import Typography from "typography";
import gray from "gray-percentage";

const MyTheme = {
  title: "MyTheme",
  baseFontSize: "12px",
  baseLineHeight: 1.4,
  headerFontFamily: ["Lucida Grande", "Verdana", "Arial", "Sans-Serif"],
  bodyFontFamily: ["Lucida Grande", "Verdana", "Arial", "Sans-Serif"],
  bodyColor: "hsla(0,0%,0%,0.8)",
  headerWeight: "bold",
  bodyWeight: "normal",
  boldWeight: "bold",
  overrideStyles: ({ rhythm }) => ({
    h2: {
      marginTop: rhythm(2)
    },
    h3: {
      marginTop: rhythm(2)
    },
    p: {
      marginBottom: "1em",
      marginTop: "1em"
    },
    ol: {
      marginBottom: 0,
      marginLeft: rhythm(2.125)
    },
    ul: {
      listStyle: "none",
      marginLeft: 0,
      paddingLeft: rhythm(5 / 8),
      textIndent: rhythm(-5 / 8)
    },
    li: {
      display: "list-item",
      marginLeft: rhythm(5 / 8)
    },
    "ul li:before": {
      content: '"» "'
    },
    a: {
      color: "#06c",
      textDecoration: "none"
    },
    "a:hover": {
      color: "#147",
      textDecoration: "underline"
    },
    "a:visited": {
      color: "#b85b5a"
    },
    blockquote: {
      color: gray(47),
      marginTop: rhythm(1),
      marginRight: rhythm(2),
      marginBottom: 0,
      marginLeft: rhythm(5 / 8),
      paddingLeft: rhythm(1.25),
      borderLeft: `${rhythm(1 / 3)} solid ${gray(87)}`
    },
    "a.gatsby-resp-image-link": {
      boxShadow: "none"
    }
  })
};

const typography = new Typography(MyTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
