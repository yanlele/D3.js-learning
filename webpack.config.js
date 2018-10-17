const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpack = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const baseConfig = {
    entry: {
        vendor: ['d3'],
        common: './app/common.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash:5].js'
    },
    devtool: 'cheap-module-source-map',
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

const generatePage = function({
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

const pages = [
    generatePage({
        title: 'Main',
        entry: {
            main: './app/Main.ts'
        },
        name: 'Main',
        chunks: ['main', 'vendor', 'common'],         // 这个地方的chunks 就是自己的代码加上公用的代码
    }),

    generatePage({
        title: '01、D3基础：选择集与数据',
        entry: {
            '01、D3基础：选择集与数据': './app/01、D3基础：选择集与数据/Index.ts'
        },
        name: '01、D3基础：选择集与数据',
        chunks: ['01、D3基础：选择集与数据', 'vendor', 'common'],         // 这个地方的chunks 就是自己的代码加上公用的代码
    }),
];

module.exports = merge([baseConfig].concat(pages));