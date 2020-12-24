const eleventy = require('./src/_config/eleventy')
const markdown = require('./src/_config/markdown')

module.exports = (config) => {
    config.addPlugin(require("eleventy-load"), {
        rules: [
            {
                test: /\.(md|html)$/,
                loaders: [
                    {
                        loader: eleventy
                    },
                    {
                        loader: require("eleventy-load-html"),
                        options: {
                            minimize: process.env.ELEVENTY_ENV === 'production',
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
            {
                test: /\.js$/,
                loaders: [
                    {
                        loader: require("eleventy-load-js"),
                    },
                    {
                        loader: require("eleventy-load-file"),
                    },
                ],
            },
            {
                test: /\.svg$/,
                loaders: [
                    {
                        loader: (content) => {
                            return `data:image/svg+xml;base64,${Buffer.from(content).toString('base64')}`
                        }
                    },
                ]
            }
        ],
    });

    config.addShortcode("icon", (name) => {
        const src = `../node_modules/bootstrap-icons/icons/${name.toLowerCase()}.svg`
        const alt = name.replace("-", " ")
        return `<img class="icon" src="${src}" alt="${alt}">`
    })

    if (process.env.ELEVENTY_ENV === 'production') {
        config.addPlugin(require("eleventy-critical-css"), {
            minify: true,
        });
    }

    // Deep merge when combining the Data Cascade
    config.setDataDeepMerge(true);

    // Options for LiquidJS
    config.setLiquidOptions({
        dynamicPartials: true,
    });

    // Options for markdown-it
    config.setLibrary("md", markdown);

    config.addWatchTarget("./src/");

    return {
        dir: {
            input: "src",
            output: "dist",
        },
    };
};
