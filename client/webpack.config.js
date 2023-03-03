const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (argv) => {
  let currentMode = argv.mode;

  return {
    entry: './src/main.tsx',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
    plugins: [
      new Dotenv({
        path: `./.env.${currentMode}`,
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'build'),
      },
      port: 3000,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'src'),
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.svg$/i,
          issuer: /\.tsx?$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    },
  };
};
