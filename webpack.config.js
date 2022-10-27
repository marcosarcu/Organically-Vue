const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            title: 'Organically - Crecé con nosotros',
            header: 'Bienvenido a Organically',
        }),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader', 
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // Image loader
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images',
                        }
                    }
                ]
            },
        ]
    }
};
