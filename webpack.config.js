module.exports = {
    devtool: 'source-map',
    entry: './src/index',
    output: {
        path: `${__dirname}/bundle`,
        filename: 'common-binders.min.js',
        libraryTarget: 'umd',
        library: 'commonBinders'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader']
            }
        ]
    }
};
