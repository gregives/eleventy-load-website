---
title: Create an icon shortcode with inline Base64 images
---

# {{ title }}

We can write a simple loader to inline Base64 images. In this example, we create an `icon` shortcode using [Bootstrap icons](https://icons.getbootstrap.com/).

{% raw %}

```html {data-file="index.html"}
{% icon "Zoom-in" %}
```

{% endraw %}

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
        test: /\.svg$/,
        loaders: [
          {
            loader: function (content) {
              const base64 = Buffer.from(content).toString("base64");
              return `data:image/svg+xml;base64,${base64}`;
            },
          },
        ],
      },
    ],
  });

  eleventyConfig.addShortcode("icon", function (name) {
    const src = `../node_modules/bootstrap-icons/icons/${name.toLowerCase()}.svg`;
    const alt = name.replace(/-fill$/, "").replace("-", " ");
    return `<img class="icon" width="16" height="16" src="${src}" alt="${alt}">`;
  });
};
```

<div class="content__links">

[See more examples of eleventy-load](/examples/)

</div>
