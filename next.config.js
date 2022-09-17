require('dotenv').config();
const path = require("path");

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    compress: true,
    webpack(config, { webpack }) {
        const prod = process.env.NODE_ENV === 'production';
        const plugins = [
            ...config.plugins,
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
        ];
        return {
            ...config,
            mode: prod ? 'production' : "development",
            devtool: prod ? "hidden-source-map" : "eval",
            module: {
                ...config.module,
                rules: [
                    ...config.module.rules,
                    {

                    }
                ],
            },
            // resolve: {
            //     ...config.resolve,
            //     alias: {
            //         ...config.resolve.alias,
            //         "@cmStyles": path.resolve(__dirname, "src/assets/styles")
            //     },
            // },
            plugins,
        }
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "assets/styles")]
    }
});