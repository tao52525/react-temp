const path = require('path')
const webpack = require('webpack')
const pkg = require('../package.json')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
function filterTypes() {
  var tpsReg = /^@types/i
  var tpsReg2 = /\.css$/i
  return Object.keys(pkg.dependencies).filter(item => {
    return !tpsReg.test(item) && !tpsReg2.test(item)
  })
}

module.exports = {
  entry: {
    vendor: filterTypes()
  },
  output: {
    path: resolve('node_modules/mc-dlls'),
    filename: '[name].dll.js',
    library: '_dll_[name]' // 全局变量名，其他模块会从此变量上获取里面模块
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: resolve('node_modules/mc-dlls/manifest.json'),
      context: path.resolve(__dirname, '../')
    })
  ],
  performance: {
    hints: 'warning',
    maxAssetSize: 30 * 1024 * 1024,
    maxEntrypointSize: 50 * 1024 * 1024,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
    }
  }
}
