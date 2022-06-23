const path = require('path');

console.log(__dirname)
module.exports = {
    mode : 'development',
    entry: './src/features/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'src/dist'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
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
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    watchOptions : {
        aggregateTimeout : 1000 ,
        ignored: ['/node_modules/' , '/src/connection/' , '/src/public/' , '/src/views/']
    }
}