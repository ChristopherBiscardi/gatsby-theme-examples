const path = require("path");
const Debug = require("debug");

exports.withThemePath = relativePath => {
  const debug = Debug("gatsby-theme:with-theme-path");
  debug("resolving", relativePath);
  let pathResolvedPath = path.resolve(relativePath);
  let finalPath = pathResolvedPath;

  try {
    debug("checking", pathResolvedPath);
    // check if the user's site has the file
    require.resolve(pathResolvedPath);
    finalPath = pathResolvedPath;
  } catch (e) {
    try {
      // if the user hasn't implemented the file,
      finalPath = require.resolve(relativePath);
    } catch (e) {
      console.log(e);
      return relativePath;
    }
  }

  debug("using", finalPath);
  return finalPath;
};
