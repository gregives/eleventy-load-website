# Making complicated Eleventy sites easy

Wish there was a way to import Sass files as easily as CSS files? Now there is!

Introducing eleventy-load, an [Eleventy](https://11ty.dev/) plugin which resolves dependencies and post-processes files for you. Loading Sass files is just one example: eleventy-load exposes 'loaders' which can process any file, including CSS, HTML, JavaScript, images, raw files and more. The concept of eleventy-load is very similar to [webpack loaders](https://webpack.js.org/loaders/), albeit with infinitely less JavaScript sent to the browser.

```js
module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(require("eleventy-load"), {
        rules: [
            {
                test: /\.scss$/,
                loaders: [
                    {
                        loader: require("eleventy-load-sass"),
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
};
```