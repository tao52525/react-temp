const path = require('path')
const rootPath = path.join(__dirname, '..')
const config = require('./config')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  entry: path.join(rootPath, 'src', 'index.js'),
  output: {
    filename: '[name].js',
    path: path.join(rootPath, config.outputDir)
  },
  resolve: {
    extensions: config.extensions,
    alias: config.alias
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      // 把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
      loader: 'happypack/loader?id=happyBabel',
      exclude: /node_modules/
    },
    /* config.module.rule('images') */
    {
      test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
      use: [
        /* config.module.rule('images').use('url-loader') */
        {
          loader: 'url-loader',
          options: {
            limit: 4096,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          }
        }
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    }]
  },
  plugins: [
    new HappyPack({
      id: 'happyBabel',
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true'
      }],
      threadPool: happyThreadPool,
      verbose: true
    })
  ]
}
