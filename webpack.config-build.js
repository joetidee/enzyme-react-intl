var path = require('path');
var webpack = require("webpack");
var nodeExternals = require('webpack-node-externals');
const TARGET = process.env.npm_lifecycle_event;

module.exports = {
	devtool: 'source-map',
    entry: [path.join(__dirname, '/src/index.js')],
	externals: [
        nodeExternals(), // in order to ignore all modules in node_modules folder.
        {
            'react/addons': true,
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': true
        }
    ],
	module: {
        rules: [{
            test: /\.js?$/,
            use: ['babel-loader'],
            include: path.join(__dirname, '/src')
        }]
	},
    output: {
        filename: 'enzyme-react-intl.js',
        path: path.resolve(__dirname, 'lib'),
		library: 'enzyme-react-intl',
		libraryTarget: 'umd',
		umdNamedDefine: true
    },
    target: 'node'
};