var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'app/js'),
  //20171026 changedd entry from app.js to index.js
  entry: ['./index.html','./index.js'],
  output: { 
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.html$/,
        loader: "file-loader?name=[name].[ext]",
      },
      {
        test: /\.css$/, 
        loader: "style-loader!css-loader" 
      },
      /* added this to support creating customized scss of grommet.  Hoping to blend grommet style with web chat styles so there is a prper look and feel */
      {
        test: /\.scss$/,

        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&' +
        'includePaths[]=' +
        (encodeURIComponent(
            path.resolve(process.cwd(), './node_modules')
        )) +
        '&includePaths[]=' +
        (encodeURIComponent(
                path.resolve( process.cwd(),
                    './node_modules/grommet/node_modules'))
        )
        +
        '&includePaths[]=' +
        (encodeURIComponent(
                path.resolve( process.cwd(),
                    '.app/scss/'))
        )
      },
      /*previously working but removed to try and resolve the  scss loader issue when creating a custom theme
      {
        rules: [{
          test: /\.scss$/, 
          use: [{
            loader: "style-loader"
          }, {
            loader: "css-loader"
            }, { 
            loader: "sass-loader"
          }]
        }]
      },*/
      { 
        test: /\.png$/, 
        loader: "url-loader?limit=100000" 
      },
      { 
        test: /\.jpg$/, 
        loader: "file-loader" 
      }
    ],
  },
  resolve: {
      modules: ['node_modules'],
      alias: {
        react: path.resolve('node_modules/react'),
      },
  },
  devServer: {
    historyApiFallback: true
  }
};