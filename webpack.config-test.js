var path = require('path');
var webpack = require("webpack");
var nodeExternals = require('webpack-node-externals');
const TARGET = process.env.npm_lifecycle_event;

module.exports = {
    devtool: "cheap-module-source-map",
    externals: [
        nodeExternals(), // in order to ignore all modules in node_modules folder.
        {
            'react/addons': true,
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': true
        }
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"]
            }
        ]
    },
    output: {
        // sourcemap support for IntelliJ/Webstorm
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    resolve: {
        alias: {
            'app': path.join(__dirname, '/src/index.js')
        }
    },
    target: 'node'
};