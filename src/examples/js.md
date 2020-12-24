---
title: Bundle JavaScript with webpack
---

# {{ title }}

Add your `script` element as usual, with a `src` attribute. The JavaScript will be bundled with webpack using eleventy-load-js.

```html {data-file="index.html"}
<script src="index.js"></script>
```

```js {data-file=".eleventy.js"}
module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(require("eleventy-load"), {
        rules: [
            {
                test: /\.(md|html)$/,
                loaders: [
                    {
                        loader: require("eleventy-load-html")
                    }
                ]
            },
            {
                test: /\.js$/,
                loaders: [
                    {
                        loader: require("eleventy-load-js")
                    },
                    {
                        loader: require("eleventy-load-file")
                    }
                ]
            }
        ]
    });
};
```

<div class="content__links">

[See more examples of eleventy-load](/examples/)

</div>
