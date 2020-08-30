const path = require('path')
const resolve = dir => { return path.join(__dirname, dir) };

module.exports = {
  publicPath: "/",
  outputDir:"dist",
  indexPath:'index.html',
  filenameHashing:false,
  // transpileDependencies:["vue"],
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')).set('@c', resolve('src/components')) 

  },
  productionSourceMap:false,
  css:{
    extract:false
  },
  configureWebpack:{
    externals:{
      // "vue":"Vue",
      // "TimelineMax":"TimelineMax",
      // "eruda":"eruda"
    },
    output: {
      libraryExport: 'default'
    }
  }
}
