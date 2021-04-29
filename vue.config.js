const path = require('path');
const fs = require('fs');
function resolveSrc(_path) {
  return path.join(__dirname, _path);
}
// vue.config.js
module.exports = {
  lintOnSave: true,
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        assets: resolveSrc('src/assets')
      }
    },
  },
  devServer:{
    https:{
      key: fs.readFileSync('access-my-research.com-key.pem'), cert: fs.readFileSync('access-my-research.com.pem')
    },
    proxy: "https://j9mov8hjg8.execute-api.us-east-2.amazonaws.com/search-es-api-test/search-es-api-test",
  }
};
