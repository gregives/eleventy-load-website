module.exports = (config) => {
    config.addPlugin(require("eleventy-load"), {
        rules: [
            {
                test: /\.(md|html)$/,
                loaders: [
                    {
                        loader: require("eleventy-load-html"),
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                loaders: [
                    {
                        loader: require("eleventy-load-sass"),
                    },
                    {
                        loader: require("eleventy-load-css"),
                    },
                    {
                        loader: require("eleventy-load-file"),
                        options: {
                            name: "[hash].css",
                        },
                    },
                ],
            },
        ],
    });

    config.addPlugin(require("eleventy-critical-css"), {
        minify: true,
    });

    // Deep merge when combining the Data Cascade
    config.setDataDeepMerge(true);

    // Options for LiquidJS
    config.setLiquidOptions({
        dynamicPartials: true,
    });

    config.addWatchTarget("./src/");

    return {
        dir: {
            input: "src",
            output: "dist",
        },
    };
};
