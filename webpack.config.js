const nib = require('nib')
const path = require('path')
const webpack = require('webpack')

const NODE_ENV = process.env.NODE_ENV || 'development'
const DEVELOPMENT = NODE_ENV === 'development'
const PRODUCTION = NODE_ENV === 'production'

const config = {
  devtool: '#inline-source-map',
  entry: {
    app: [
      './src/client'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'stylus-loader'
          }
        ]
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'assets'),
    publicPath: '/assets'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.styl$/,
      stylus: {
        use: [nib()],
        import: ['~nib/lib/nib/index.styl']
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('commons.chunk')
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.styl'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  }
}

if (DEVELOPMENT) {
  config.entry.app.push('webpack-hot-middleware/client')
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  )
}

if (PRODUCTION) {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  )
}

module.exports = config
