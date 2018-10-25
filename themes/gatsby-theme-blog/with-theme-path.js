const path = require('path')
const Debug = require('debug')
const debugTheme = Debug('withThemePath')

module.exports = relativePath => {
  debugTheme('stuff', relativePath)
  let pathResolvedPath = path.resolve(relativePath)
  debugTheme(pathResolvedPath)
  let finalPath = pathResolvedPath

  try {
    // check if the user's site has the file
    require.resolve(pathResolvedPath)
    finalPath = pathResolvedPath
  } catch (e) {
    try {
      // if the user hasn't implemented the file,
      finalPath = require.resolve(relativePath)
    } catch (e) {
      console.log(e)
      return relativePath
    }
  }

  debugTheme('using', finalPath)
  return finalPath
}
