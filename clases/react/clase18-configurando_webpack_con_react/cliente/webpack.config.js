//ARCHIVO PARA CONFIGURAR WEBPACK. ESTO PORQUE QUEREMOS UTILIZAR BABEL Y REACT.
//ESTE TIENE LA NOMENCLATURA DE NODE JS.
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';
const mode = isDevelopment ? 'development' : 'production';
const devPlugings = !isDevelopment ? [] : [ new ReactRefreshWebpackPlugin()];

module.exports ={
    entry: "./src/index.js", //Cual será el archivo de ingreso
    output: { //descripcion de la salida
        //filename: "main.js", //nombre del archivo
        filename: "[name].[contenthash].js", //La de arriba es como la forma normal, pero este es para evitar el hash del navegador.Esto evita problemas con cache.
        path: path.resolve(__dirname, "dist"), //lo guarde en la ruta absoluta con la variable path
        publicPath: "/" //nos indica donde estan los JS y CSS 
    },
    mode: mode,
    devServer: {
        port: 5000,
        open: true,
        hot: true, //Solo refrescar elementos de la página que necesitamos o hot reload
        historyApiFallback: true
    },
    //mode: "production", //Para definir en que entorno estara. En este caso es para produccion, que dara como resultado optimizarlo.
    module: { 
        rules: [ //le diran a webpack como especificar cada archivo.
            {
                use: "babel-loader", //aca le decimos que utilice babel loader 
                test: /.js$/, //Con esto le decimos que todos los archivos que terminan con js estaran procesados con babel loader
                exclude: /node_modules/ //que archivos excluir.
            },
            {
                use:[MiniCssExtractPlugin.loader, "css-loader"],
                //use: ["style-loader", "css-loader"],
                test: /.css$/
            },
            {
                type:"asset",
                test: /.(png|svg|jpg|jpeg|gif)$/i
            }
        ]
    },
    plugins: [
        ...devPlugings,
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
}