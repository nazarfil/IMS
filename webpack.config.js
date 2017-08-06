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
    rules:[
        {test: /\.bin/, use:'raw-loader'}
    ],

    loaders: [
        {
            test: /\.sol$/,
            loaders: ['web3', 'solc']
        },
        {   test: /\.sol$/,
            loaders: ['solc']},
        { test: /\.js$/,  loaders: ['babel-loader'], include: path.join(__dirname, 'src'), exclude: path.join(__dirname, 'node_modules')},
        
        ]
    }
};