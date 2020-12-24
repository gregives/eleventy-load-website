const markdown = require("markdown-it");
const highlight = require("highlight.js");

highlight.configure({
    classPrefix: "code__",
});

module.exports = (config) => {
    config.addPlugin(require("eleventy-load"), {
        rules: [
            {
                test: /\.(md|html)$/,
                loaders: [
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
                        loader: function (content) {
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
    config.setLibrary(
        "md",
        markdown({
            html: true,
            typographer: true,
            langPrefix: "code code--",
            highlight(str, lang) {
                if (lang && highlight.getLanguage(lang)) {
                    try {
                        return highlight.highlight(lang, str).value;
                    } catch {
                        // Fallback to default
                    }
                }

                return "";
            },
        })
            .disable("code")
            .use(require("markdown-it-attrs"))
    );

    config.addWatchTarget("./src/");

    return {
        dir: {
            input: "src",
            output: "dist",
        },
    };
};
