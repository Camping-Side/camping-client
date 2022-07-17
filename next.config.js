require('dotenv').config();

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
            plugins,
        }
    },
});