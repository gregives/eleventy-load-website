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
    );

    config.addWatchTarget("./src/");

    return {
        dir: {
            input: "src",
            output: "dist",
        },
    };
};
