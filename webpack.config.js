const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpack = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const fse = require('fs-extra');

const baseConfig = {
    devtool: 'inline-source-map',
    entry: {
        vendor: ['d3'],
        common: './app/common.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash:5].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader'
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                localIdentName: '[path][name]_[local]_[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            }
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin({
            filename: 'css/[name].[hash].css'
        }),

        new CleanWebpack(path.resolve(__dirname, 'dist')),

        new webpack.optimize.CommonsChunkPlugin({               // 提取三方生成的代码, 包括模块代码
            names: ['vendor'],
            minChunks: Infinity
        }),

        new webpack.optimize.UglifyJsPlugin()
    ]
};

const generatePage = function ({
                                   title = '',
                                   entry = '',
                                   template = './app/index.html',
                                   name = '',
                                   chunks = []
                               } = {}) {
    return {
        entry,
        plugins: [
            new HtmlWebpackPlugin({
                chunks,
                template,
                title,
                filename: name + '.html'
            })
        ]
    }
};

const appPaths = fse.readdirSync(path.resolve(__dirname, 'app'));
let appItemPath = '';
let myPages = [];
let appItemHtmlTemplate = '';
appPaths.map(function (item) {
    appItemPath = path.resolve(__dirname, 'app', item, 'index.ts');
    appItemHtmlTemplate = path.resolve(__dirname, 'app', item, 'index.html');
    if(fse.pathExistsSync(appItemPath)) {
        myPages.push(generatePage({
            title: item,
            entry: {
                [item]: `./app/${item}/index.ts`
            },
            name: item,
            chunks: [item, 'vendor', 'common'],
            template: fse.pathExistsSync(appItemHtmlTemplate) ? path.resolve(__dirname, 'app', item, 'index.html') : './app/index.html',
        }))
    }
});

module.exports = merge([baseConfig].concat(myPages));