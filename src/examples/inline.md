---
title: Inline Base64 images
---

# {{ title }}

We can write a simple loader to inline Base64 images. In this example, we create an `icon` shortcode using [Bootstrap icons](https://icons.getbootstrap.com/).

{% raw %}
```html {data-file="index.html"}
{% icon "Zoom-in" %}
```
{% endraw %}

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
                test: /\.svg$/,
                loaders: [
                    {
                        loader: function(content) {
                            return `data:image/svg+xml;base64,${Buffer.from(content).toString('base64')}`
                        }
                    }
                ]
            }
        ]
    });

    eleventyConfig.addShortcode("icon", function(name) {
        const src = `../node_modules/bootstrap-icons/icons/${name.toLowerCase()}.svg`;
        const alt = name.replace("-", " ");
        return `<img class="icon" src="${src}" alt="${alt}">`;
    });
};
```