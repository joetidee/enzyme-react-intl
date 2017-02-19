var path = require('path');
var webpack = require("webpack");

module.exports = {
    entry: [path.join(__dirname, '/src/index.js')],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '/dist')
    },
    plugins: [
        new webpack.IgnorePlugin(/react\/addons/),
        new webpack.IgnorePlugin(/react\/lib\/ReactContext/),
        new webpack.IgnorePlugin(/react\/lib\/ExecutionEnvironment/)
    ]
};