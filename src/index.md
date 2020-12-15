# Making complicated Eleventy sites easy

Wish there was a way to import Sass files as easily as CSS files? Now there is!

Introducing eleventy-load, an [Eleventy](https://11ty.dev/) plugin which resolves dependencies and post-processes files for you. Loading Sass files is just one example: eleventy-load exposes 'loaders' which can process any file including HTML, CSS, JavaScript, images, raw files and more. The concept of eleventy-load is very similar to [webpack loaders](https://webpack.js.org/loaders/), albeit with infinitely less JavaScript sent to the browser.

<div class="demonstration">
<div class="demonstration__column">

Write this

```html
<link rel="stylesheet" href="styles.scss">
```

```scss
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

```html
<link rel="stylesheet" href="/assets/2a78524b.css">
```

```css
body {
    background-color: linen;
}

body h1 {
    color: 5rem;
}
```

</div>
</div>
<div>

with just a little set-up:

```js
module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(require("eleventy-load"), {
        rules: [
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
                    },
                ],
            },
        ],
    });
};
```

</div>