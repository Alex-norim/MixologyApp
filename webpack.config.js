const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode : 'development',
    devtool: "inline-source-map",
    entry: './src/features/index.ts',
    output: {
        filename: 'bundler.js',
        path: path.resolve(__dirname, 'src/dist/'),
        environment : {
            arrowFunction: true,
        }
    },
    plugins: [
        new MiniCssExtractPlugin( {
            filename : 'style.css',
        }) ,
        new CleanWebpackPlugin()
    ]
    ,
    module: {
        rules: [
            // {
            //     test: /\.m?js$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: "babel-loader",
            //         options: {
            //             presets: ['@babel/preset-env']
            //         }
            //     }
            // },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader : 'file-loader',
                options : {
                    name : 'image/[name].[ext]'
                }
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test:/\.(s*)css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    watchOptions : {
        aggregateTimeout : 1000 ,
        ignored: ['/node_modules/' , '/src/connection/' , '/src/public/' , '/src/views/']
    }
}