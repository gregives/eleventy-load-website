# How to use eleventy-load

## 1. Install eleventy-load

We'll assume that you already know [how to create a site with Eleventy](https://www.11ty.dev/docs/getting-started/). To use eleventy-load in our Eleventy project, first we need to install it as a dependency.

```sh
npm install --save-dev eleventy-load
```

## 2. Add eleventy-load as a plugin

After we have installed eleventy-load, we can add it as an Eleventy plugin in our `.eleventy.js` file.

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(require("eleventy-load"));
};
```

Now you can run your Eleventy project, but we haven't actually told eleventy-load to do anything yet...

```sh
Try giving eleventy-load some rules!
```

## 3. Install loaders

Loaders are the brains of eleventy-load; without them, nothing will happen. Say that we want to import Sass files like we would import CSS files, with a `link` element.

```html
<link rel="stylesheet" href="styles.scss">
```

There are four things that loaders can do for us:

1. Find the `link` element in the HTML template.
2. Load the Sass and convert the Sass into CSS.
3. Optionally, find dependencies (like images) in the CSS.
4. Output the CSS into a file.

Let's install these loaders now.

```sh
npm install --save-dev eleventy-load-html eleventy-load-sass eleventy-load-css eleventy-load-file
```

## 4. Apply loaders with rules

Loaders are applied to files using 'rules'. A rule consists of a 'test' and a number of loaders. A test is a regular expression which is matched against filenames. For example, a rule which applied eleventy-load-html against every file ending in `.md` or `.html` would look like this:

```js
{
    test: /\.(md|html)$/,
    loaders: [
        {
            loader: require("eleventy-load-html"),
        },
    ],
},
```

Note that the test is matched against the **input** filename, not the output.

We can set up rules so that eleventy-load imports Sass files using `link` elements.

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

## 5. You're ready to go

That's all it takes to set up eleventy-load to import Sass files using `link` elements.

<div class="content__links">

[See more examples of eleventy-load](/examples)

[Discover the loaders that you can use](/loaders)

[Write your own loader (don't worry, it's easy)](/api)

</div>