//由于webpack是由Nodejs构建的，所以任何的Nodejs语法都支持


//引入路径模块
var path = require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')
    // qing
const CleanWebpackPlugin = require('clean-webpack-plugin');

const uglify = require('uglifyjs-webpack-plugin');

const webpack = require('webpack')
//提取css文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//当以命令形式运行webpack或者webpack-dev-server的时候，工具会发现，我们没用提供要打包的文件入口和出口命令

//此时，就会检查项目根目录中的配置文件 webpack.config.js 并读取这个文件，就拿到了导出的这个配置对象，然后根据对象进行打包


//向外暴露出这个对象
module.exports = {
    entry: path.join(__dirname, './src/main.js') //入口文件，需要打包的文件
        ,
    output: { //出口文件，需要打包到哪里去
        path: path.join(__dirname, './dist/bundle.js') //输出路径
            ,
        filename: 'bundle.js'
    },
    mode: 'development', //设置mode，在4.0新增
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath: '../'
                },
                
                )
            }, {
                test: /\.scss$/,
                use:  ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader'],
                publicPath: '../'
            }),
               
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:8][name].[ext]', //设置八位数哈希值
                    outputPath: 'images/' //图片输出路径
                }
            }, {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), //指定模板文件的目录
            filename: 'index.html', //设置生成的页面名称
            minify: {
                collapseWhitespace: true, //合并空格
                removeComments: true, //移除注释
                removeAttributeQuotes: true, //移除属性上的双引号
            }

        }),
        new ExtractTextPlugin("css/styles.css"),
        new uglify(),
    ],
        optimization: {
        splitChunks:{
            cacheGroups: {
                vender:{
                    test:/node_modules/,
                    chunks:'initial',
                    name:'vender',
                    priority:10
                },
                utils:{
                    chunks:'initial',
                    name:'utils',
                    minSize:0
                }
            }
        }
    }
}