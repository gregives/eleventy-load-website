---
description: Link Sass files as easily as CSS
---

# Link Sass files as easily as CSS

In your HTML, you can link a Sass file like you would a CSS file, using a `link` element.

```html
<link rel="stylesheet" href="styles.scss">
```

**Note:** eleventy-load-html looks for files in your input directory, so if your Sass file lives in an `assets` directory, you need to include this like `assets/styles.scss`.

In your Eleventy configuration file `.eleventy.js`, add the eleventy-load plugin and configure the rules so that you can link Sass files. Each loader is needed to do a different thing:

- eleventy-load-html finds dependencies, like your Sass file, in your Markdown and HTML files. Remember that eleventy-load uses **input** paths to apply loaders, hence we need to match `.md` in our test.
- eleventy-load-sass converts Sass to CSS using [Dart Sass](https://github.com/sass/dart-sass). You can pass options to eleventy-load-sass like `indentedSyntax` to use Sass instead of SCSS.
- eleventy-load-css finds dependencies in your CSS (like background images). You can pass options like `minimize`.
- eleventy-load-file saves the CSS to a file in your output directory. We pass the `name` option to ensure that the file's extension is `.css`.

```js
module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(require("eleventy-load"), {
        rules: [
            {
                test: /\.(md|html)$/,
                loaders: [
                    {
                        loader: require("eleventy-load-html"),
                    },
                ],
            },
            {
                test: /\.scss$/,
                loaders: [
                    {
                        loader: require("eleventy-load-sass"),
                        options: {
                            indentedSyntax: true // True for Sass, false for SCSS
                        }
                    },
                    {
                        loader: require("eleventy-load-css"),
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: require("eleventy-load-file"),
                        options: {
                            name: "[hash].css"
                        }
                    },
                ],
            },
        ],
    });
};
```

<div class="content__links">

[See more examples of eleventy-load](/usage/)

</div>