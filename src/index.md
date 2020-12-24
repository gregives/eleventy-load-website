# Making Eleventy sites&nbsp;easy

Wish there was a way to import Sass files as easily as CSS files? Now there is!

Introducing eleventy-load, an [Eleventy](https://11ty.dev/) plugin which resolves dependencies and post-processes files for you. Loading Sass files is just one example: eleventy-load exposes 'loaders' which can process any file including HTML, CSS, JavaScript, images and more. The concept of eleventy-load is very similar to [webpack loaders](https://webpack.js.org/loaders/), albeit with infinitely less JavaScript sent to the browser.

<div class="demonstration">
<div class="demonstration__column">

Write this

```html {data-file="index.html"}
<link rel="stylesheet" href="styles.scss">
```

```scss {data-file="styles.scss"}
$massive: 5rem;

body {
    background-color: linen;

    h1 {
        font-size: $massive;
    }
}
```

</div>
<div class="demonstration__column">

and end up with this

```html {data-file="index.html"}
<link rel="stylesheet" href="/assets/a98164b2.css">
```

```css {data-file="a98164b2.css"}
body {
  background-color: linen;
}
body h1 {
  font-size: 5rem;
}
```

</div>
<div class="demonstration__full">

with some simple set-up:

```js {data-file=".eleventy.js"}
module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(require("eleventy-load"), {
        rules: [
            {
                test: /\.html$/,
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
                    },
                    {
                        loader: require("eleventy-load-css"),
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

</div>
</div>

## Ready to make an awesome site?

<div class="content__links">

[How to add eleventy-load to your Eleventy project](/usage/)

[Discover the loaders that you can use](/loaders/)

[Write your own loader (don't worry, it's easy)](/api/)

</div>

