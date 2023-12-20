const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devServer: {
        historyApiFallback: true,
        port: 3002,
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "RemoteApp",
        filename: "remoteEntry.js",
        exposes: {
          "./Button": "./src/Button", 
        },
        shared: {
          react: {
            singleton: true,
          },
          'react-dom': {
            singleton: true,
          },
        }
      }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            fileName: 'index.html',
        })
    ]
}