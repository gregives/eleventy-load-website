---
title: Save assets with hashed filenames
---

# {{ title }}

You can use eleventy-load-file to save assets to the output directory, including text-based files like SVGs and binary files like JPEGs. In your HTML, reference your assets like normal, for example, an `img` element.

```html {data-file="index.html"}
<img src="cat.jpeg" alt="Fat cat staring out of a window" />
```

```js {data-file=".eleventy.js"}
module.exports = function (eleventyConfig) {
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
        test: /\.(avif|gif|png|jpe?g|webp)$/,
        loaders: [
          {
            loader: require("eleventy-load-file"),
          },
        ],
      },
    ],
  });
};
```

<div class="content__links">

[See more examples of eleventy-load](/examples/)

</div>
