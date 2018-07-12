const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  // Tell webpack the root file of our
  // server application
  entry: './src/client/client.js',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module:{
    rules:[       
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader"]
          })
        },
        {
          test: /\.less$/,
          use: [{
              loader: "style-loader"
          }, {
              loader: "css-loader"
          }, {
              loader: 'postcss-loader',
              options: {
                  ident: 'postcss',
                  plugins: (loader) => [
                      require('autoprefixer')(),                        
                  ]
              }
          },{
              loader: "less-loader", options: {                 
                  noIeCompat: true
              }
          }]           
        },
        {
          test: /\.(png|jp(e*)g|svg)$/,  
          use: [{
              loader: 'url-loader',
              options: { 
                  limit: 50000, // Convert images < 50kb to base64 strings
                  name: 'images/[hash]-[name].[ext]'
              } 
          }]
        } 
    ]
  },
};

module.exports = merge(baseConfig, config);
