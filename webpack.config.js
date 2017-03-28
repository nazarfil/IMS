var webpack = require('webpack');
var path  = require('path');
module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    watch:true,
    module: {
    loaders: [
           {
        test: /\.sol$/,
        loaders: ['web3', 'solc']
    },
     {
        test: /\.sol$/,
        loaders: ['solc']},
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'src')
    },
    { test: /\.sol$/, loaders: ["solidity-loader?export=true"]},
    { test: /\.css$/, loader: "style-loader!css-loader" },
    { test: /\.png$/, loader: "url-loader?limit=100000" },
    { test: /\.json$/, loader: "json-loader" },
    { test: /\.jpg$/, loader: "file-loader" }
        
    ]}
};