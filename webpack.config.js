const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);
const {presets} = require(`${appDirectory}/babel.config.js`);

const compileNodeModules = [
    'react-native-paper',
    'react-native-vector-icons',
    '@react-navigation/native',
    '@react-navigation/stack',
    'react-native-gesture-handler',
    'react-native-reanimated',
    'react-native-screens',
].map(moduleName => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
    test: /\.js$|tsx?$/,
    // Add every directory that needs to be compiled by Babel during the build.
    include: [
        path.resolve(appDirectory, 'index.js'),
        path.resolve(appDirectory, 'App.js'),
        path.resolve(appDirectory, 'src'),
        path.resolve(appDirectory, '../EscrowBase'),
        ...compileNodeModules,
    ],
    use: {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            presets,
            plugins: [
                // 'react-native-web',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
            ],
        },
    },
};

const imageLoaderConfiguration = {
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
        loader: 'url-loader',
        options: {
            name: '[name].[ext]',
            esModule: false,
        },
    },
};

module.exports = {
    // mode: 'development',
    entry: {
        app: path.join(appDirectory, 'index.js'),
    },

    // configures where the build ends up
    output: {
        filename: 'bundle.js',
        publicPath: '/',
        path: path.resolve(appDirectory, 'dist'),
    },

    // devtool: 'source-map',

    module: {
        rules: [babelLoaderConfiguration, imageLoaderConfiguration],
    },

    resolve: {
        // This will only alias the exact import "react-native"
        alias: {
            'react-native$': 'react-native-web',
        },
        extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            // See: https://github.com/necolas/react-native-web/issues/349
            __DEV__: JSON.stringify(true),
        }),
    ],
};
