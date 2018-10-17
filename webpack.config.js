const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpack = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const baseConfig = {
    entry: {
        d3: 'd3'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },

    module: {
        rules: [
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

        new webpack.optimize.CommonsChunkPlugin({
            name: 'd3',
            minChunks: Infinity
        })
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
        title: 'page A',
        entry: {
            a: './src/pages/a'
        },
        name: 'a',
        chunks: ['react', 'a'],         // 这个地方的chunks 就是自己的代码加上公用的代码
    }),
    generatePage({
        title: 'page B',
        entry: {
            b: './src/pages/b'
        },
        name: 'b',
        chunks: ['react', 'b'],         // 这个地方的chunks 就是自己的代码加上公用的代码
    }),
    generatePage({
        title: 'page C',
        entry: {
            c: './src/pages/c'
        },
        name: 'c',
        chunks: ['react', 'c'],         // 这个地方的chunks 就是自己的代码加上公用的代码
    })
];

console.log(merge([baseConfig].concat(pages)));
module.exports = merge([baseConfig].concat(pages));