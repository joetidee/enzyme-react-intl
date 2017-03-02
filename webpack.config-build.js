var path = require('path');
var webpack = require("webpack");
const TARGET = process.env.npm_lifecycle_event;

module.exports = {
	devtool: 'source-map',
    entry: [path.join(__dirname, '/src/index.js')],
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
    plugins: [
        new webpack.IgnorePlugin(/react\/addons/),
        new webpack.IgnorePlugin(/react\/lib\/ReactContext/),
        new webpack.IgnorePlugin(/react\/lib\/ExecutionEnvironment/)
    ],
    target: 'node'
};