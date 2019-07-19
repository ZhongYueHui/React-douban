//由于webpack是由Nodejs构建的，所以任何的Nodejs语法都支持


//引入路径模块
var path = require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')

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
            use: ['style-loader', 'css-loader']
        }
            , {
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader?modules", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            options: {
                name: './images/[name].[ext]',
                limit: 8192
            }
        }, {
            test: /\.jsx?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), //指定模板文件的目录
            filename: 'index.html' //设置生成的页面名称

        }),

    ],
    // watch: true
    target: 'web',
    node: {
        fs: 'empty',
        child_process: 'empty',

    }
}