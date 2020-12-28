---
title: Link Sass files as easily as CSS
---

# {{ title }}

In your HTML, you can link a Sass file like you would a CSS file, using a `link` element. Firstly, eleventy-load-sass will compile the Sass to CSS and eleventy-load-css will find any dependencies in the CSS.

```html {data-file="index.html"}
<link rel="stylesheet" href="styles.scss" />
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
        test: /\.scss$/,
        loaders: [
          {
            loader: require("eleventy-load-sass"),
            options: {
              indentedSyntax: true, // True for Sass, false for SCSS
            },
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
};
```

<div class="content__links">

[See more examples of eleventy-load](/examples/)

</div>
