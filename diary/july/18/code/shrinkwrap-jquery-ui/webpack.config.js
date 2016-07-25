var path = require('path');
//     webpack               = require('webpack'),
//     ExtractTextPlugin     = require('extract-text-webpack-plugin'),
//     WebpackNotifierPlugin = require('webpack-notifier'),
//     SvgStore              = require('webpack-svgstore-plugin'),
//     publicPath            = path.resolve('skin/frontend/matrix/default/public'),
//     tmpPath               = path.resolve('skin/frontend/matrix/default/tmp');

module.exports = {
    context: path.resolve('./src'),

    entry: {
        main: './main.js'
    },

    output: {
        path: './dist',
        publicPath: 'dist',
        filename: '[name].js'
    }
    //
    // externals: {
    //     "jquery": "jQuery"
    // },
    //
    // module: {
    //     loaders: [
    //         {
    //             test: /\.less$/,
    //             loader: ExtractTextPlugin.extract("style", 'css?-autoprefixer!postcss!less')
    //         },
    //         {
    //             test: /\.css$/,
    //             loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer')
    //         },
    //         {
    //             test: /\.(svg|eot|ttf|woff|png|jpg|gif)/,
    //             loader: 'file?name=[path][name].[ext]'
    //         }
    //     ]
    // },
    //
    // postcss: [
    //     require('autoprefixer'),
    //     require('postcss-sorting')({ 'sort-order': 'yandex' })
    // ],
    //
    // devServer: {
    //     headers: {
    //         // Handling issue with CORS font loading
    //         "Access-Control-Allow-Origin": "*"
    //     },
    //
    //     proxy: {
    //         // Rewrite Magento fallback urls for non existing files
    //         '/skin/frontend/base/default*': {
    //             target: 'http://localhost:8080',
    //             secure: false,
    //             rewrite: function (req) {
    //                 var wdsUrl = req.url.split('/');
    //                 wdsUrl.splice(3, 2, 'matrix', 'default'); // base/default -> laroche/oggetto
    //                 wdsUrl = wdsUrl.join('/');
    //                 req.url = wdsUrl;
    //                 console.log(req.originalUrl + ' -> ' + req.url);
    //             }
    //         }
    //     }
    // },
    //
    // plugins: [
    //     new ExtractTextPlugin('[name]/css/[name].css', { // [name].css after code splitting
    //         //allChunks: true,
    //         disable: env !== 'production' // Save separate files only for production build
    //     }),
    //
    //     new SvgStore(
    //         path.join('skin/frontend/matrix/default/img/svg', '*.svg'),
    //         '',
    //         {
    //             svg: {
    //                 style: 'display: none;'
    //             },
    //             name: 'sprite.svg',
    //             prefix: ''
    //         }
    //     ),
    //
    //     new webpack.NoErrorsPlugin(),
    //
    //     new WebpackNotifierPlugin(),
    //
    //     new webpack.DefinePlugin({
    //         NODE_ENV: JSON.stringify(env || 'development')
    //     })
    // ].concat(env === 'production' ? prodPlugins : [])
};