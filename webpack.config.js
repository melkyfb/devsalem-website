const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const S3Plugin = require('webpack-s3-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, "build"),
        filename: '[name].[contenthash].js',
        publicPath: "",
        clean: true
    },
    cache: {
        type: 'filesystem',
        maxAge: 5184000000
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
          },
    },
    mode: process.env.NODE_ENV || "development",
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devServer: {
        port: 3000, 
        open: true,
        hot: true,
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(css|scss|sass)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpe?g|webp|tiff?)$/i,
                use: [
                    "file-loader",
                    {
                        loader: 'webpack-image-resize-loader',
                        options: {
                            width: 1000
                        },
                    },
                ],
            },
        ],
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Caching',
            template: path.join(__dirname, "public", "index.html"),
            hash: true, 
            favicon: path.join(__dirname, "public", "favicon.ico"),
        }),
    ],
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new CompressionPlugin({
            test: /\.(js|css)$/i,
            filename: '[name][ext]',
            algorithm: 'gzip',
            deleteOriginalAssets: true
        }),
        new WebpackManifestPlugin(),
        new S3Plugin({
            s3Options: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
              region: 'sa-east-1',
              cleanAfterDeployment: true
            },
            s3UploadOptions: {
              Bucket: process.env.BUCKET,
              ContentEncoding(fileName) {
                if(/\.(js|css)$/i.test(fileName)) {
                  return 'gzip'
                }
              },
              ContentType(fileName) {
                if(/\.css/.test(fileName)) {
                  return 'text/css'
                }
                if(/\.js/.test(fileName)) {
                  return 'text/javascript'
                }
              },
              CacheControl(fileName) {
                  return 'max-age=2592000,public'
              }
            },
            directory: 'build'
        })
    );
}