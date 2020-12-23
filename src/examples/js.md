---
description: Bundle JavaScript with webpack
---

# Bundle JavaScript with webpack

It's really easy to bundle JavaScript using eleventy-load-js. Add your `script` element as usual, with a `src` attribute.

```html
<script src="index.js"></script>
```

**Note:** eleventy-load-html looks for files in your input directory, so if your JavaScript file lives in an `assets` directory, you need to include this like `assets/index.js`.

In your Eleventy configuration file `.eleventy.js`, add the eleventy-load plugin and configure the rules so that you can link Sass files. Each loader is needed to do a different thing:

- eleventy-load-html finds dependencies, like your JavaScript file, in your Markdown and HTML files. Remember that eleventy-load uses **input** paths to apply loaders, hence we need to match `.md` in our test.
- eleventy-load-js bundles the JavaScript file using [webpack](https://webpack.js.org/).
- eleventy-load-file saves the bundled JavaScript to a file in your output directory.

```js
module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(require("eleventy-load"), {
        rules: [
            {
                test: /\.(md|html)$/,
                loaders: [
                    {
                        loader: require("eleventy-load-html")
                    },
                ],
            },
            {
                test: /\.js$/,
                loaders: [
                    {
                        loader: require("eleventy-load-js")
                    },
                    {
                        loader: require("eleventy-load-file")
                    },
                ],
            }
        ]
    });
}
```