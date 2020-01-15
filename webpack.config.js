const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ClosurePlugin = require('closure-webpack-plugin');

module.exports = {
  entry: `${__dirname}/src/app/index.js`,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/public/index.html`,
      inject: 'body',
    }),
    new ClosurePlugin.LibraryPlugin({
      closureLibraryBase: require.resolve(
          'google-closure-library/closure/goog/base',
      ),
      deps: [
        require.resolve('google-closure-library/closure/goog/deps'),
      ],
    }),
  ],
  // externals: {fs: 'commonjs fs'},
  // target: 'node',
  devServer: {
    contentBase: './src/public',
    port: 3000,
  },
};

