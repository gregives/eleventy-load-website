---
title: Usage
---

# How to use eleventy-load

## 1. Install eleventy-load

We'll assume that you already know [how to create a site with Eleventy](https://www.11ty.dev/docs/getting-started/). To use eleventy-load in our Eleventy project, first we need to install it as a dependency.

```sh
npm install --save-dev eleventy-load
```

## 2. Add eleventy-load as a plugin

After we have installed eleventy-load, we can add it as a plugin in our Eleventy configuration file.

```js {data-file=".eleventy.js"}
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(require("eleventy-load"));
};
```

Now you can run your Eleventy project, but we haven't actually told eleventy-load to do anything yet...

```sh
Try giving me some rules!
```

## 3. Install loaders

Loaders are the brains of eleventy-load; without them, nothing will happen. Say that we want to import Sass files like we would import CSS files, with a `link` element.

```html {data-file="index.html"}
<link rel="stylesheet" href="styles.scss" />
```

There are four things that loaders can do for us:

1. Find the `link` element in the HTML template.
2. Load the Sass and convert it into CSS.
3. Optionally, find dependencies (like background images) in the CSS.
4. Save the CSS into a file.

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

Note that the test is matched against the **input** filename, not the output, hence we need to apply eleventy-load-html to Markdown files as well as HTML files.

We can set up rules so that eleventy-load imports Sass files using `link` elements.

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

### Optionally test the resource query

<details>
<summary>Specify <code>resourceQuery</code> to test the query parameters of the requested resource.</summary>

The following configuration will add inline styles for any resource loaded with `inline` in the query parameter, for example, `example.scss?inline`.

```js
{
  test: /\.scss$/,
  resourceQuery: /inline/,
  loaders: [
    {
      loader: require("eleventy-load-sass"),
    },
    {
      loader: require("eleventy-load-css"),
    },
    {
      loader: (content) => {
        return `<style>${content}</style>`;
      },
    },
  ],
}
```

</details>

## 5. You're ready to go

That's all it takes to set up eleventy-load to import Sass files using `link` elements.

<div class="content__links">

[See more examples of eleventy-load](/examples/)

[Discover the loaders that you can use](/loaders/)

[Write your own loader (don't worry, it's easy)](/api/)

</div>
