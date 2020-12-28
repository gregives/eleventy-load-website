# Writing a loader

An eleventy-load loader is **just a JavaScript function**, nothing complicated! The function is passed two arguments: the `content` of the file being loaded and the user-provided `options` for the loader.

- [An example loader](#An-example-loader)
- [Loader interface](#Loader-interface)
  - [this.addDependency](#this.addDependency)
  - [this.config](#this.config)
  - [this.emitFile](#this.emitFile)
  - [this.resource](#this.resource)
  - [this.resourcePath](#this.resourcePath)
  - [this.resourceQuery](#this.resourceQuery)
- [Raw loaders](#Raw-loaders)

## An example loader

Let's write a loader to convert a text file to uppercase, _but only_ if the user passes `uppercase: true` as an option. Of course, this loader could be applied to any file, it just uppercases the content.

```js {data-file=".eleventy.js"}
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(require("eleventy-load"), {
    rules: [
      {
        test: /\.txt$/,
        loaders: [
          {
            loader: function (content, options) {
              return options.uppercase ? content.toUpperCase() : content;
            },
            options: {
              uppercase: true,
            },
          },
        ],
      },
    ],
  });
};
```

Instead of writing the loader in your Eleventy configuration file, you might want to move it into a module which exports the loader function.

```js {data-file="uppercase.js"}
module.exports = function (content, options) {
  return options.uppercase ? content.toUpperCase() : content;
};
```

```js {data-file=".eleventy.js"}
const uppercaseLoader = require("./uppercase");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(require("eleventy-load"), {
    rules: [
      {
        test: /\.txt$/,
        loaders: [
          {
            loader: uppercaseLoader,
            options: {
              uppercase: true,
            },
          },
        ],
      },
    ],
  });
};
```

## Loader interface

As well as the function parameters `content` and `options`, loaders also have access to the loader context. The context of a function can be accessed using the `this` keyword.

- [this.addDependency](#this.addDependency)
- [this.config](#this.config)
- [this.emitFile](#this.emitFile)
- [this.resource](#this.resource)
- [this.resourcePath](#this.resourcePath)
- [this.resourceQuery](#this.resourceQuery)

### this.addDependency

Add a dependency to be processed by eleventy-load. The dependency must be relative to the Eleventy project's input directory. You should always `await` adding a dependency, as the loaders processing the dependency might be asynchronous.

```js
module.exports = async function (content, options) {
  const license = await this.addDependency("LICENSE");
  return license + content;
};
```

### this.config

A copy of Eleventy's `_config` object available inside Eleventy transforms. Although this isn't documented and **may change without notice**, it contains useful information such as the project's directories. See a [complete example of the Eleventy config](/api/config/).

```json
{
  "dir": {
    "input": "src",
    "includes": "_includes",
    "data": "_data",
    "output": "dist"
  }
}
```

### this.emitFile

Save content to a file in the project's output directory. The function takes three parameters:

1. The content to save, either a `String` or `Buffer`.
2. The filepath in which to save the content, relative to the project's output directory.
3. A flag which dictates whether the file should be saved. Defaults to `true`, pass `false` to dry run.

```js
module.exports = async function (content, options) {
  return this.emitFile(content, "assets/[name].[hash:12].css", false);
};
```

The filepath can contain substitutions, useful for creating hashed files.

- `[hash]` or `[hash:N]` will be replaced with a hash of the content. Specify `N` to change the length of the hash, which defaults to 8 characters.
- `[name]` will be replaced with the original filename.
- `[ext]` will be replaced with the original file's extension.

### this.resource

The current resource being processed, relative to the project's input directory. Use `this.resourcePath` and `this.resourceQuery` to access the path and the query respectively.

```js
module.exports = function(content, options) {
    console.log(this.resource); // assets/cat.jpeg?width=1920&height=1080&format=webp
    ...
};
```

### this.resourcePath

The path of the current resource being processed, relative to the project's input directory. Here's an example which gets the last-modified time of the current resource.

```js
const fs = require("fs");
const path = require("path");

module.exports = function(content, options) {
    console.log(this.resourcePath); // assets/cat.jpeg
    const resource = path.resolve(this.config.dir.input, this.resourcePath);
    const lastModifiedTime = fs.statSync(resource).mtime;
    ...
};
```

### this.resourceQuery

The query of the current resource being processed. You can use [URLSearchParams](https://nodejs.org/api/url.html#url_class_urlsearchparams) to easily parse the query.

```js
module.exports = function(content, options) {
    console.log(this.resourceQuery); // ?width=1920&height=1080&format=webp
    const params = new URLSearchParams(this.resourceQuery);
    console.log(params.get("format")); // webp
    ...
};
```

## Raw loaders

By default, the content of a resource is loaded as a UTF-8 string and passed to the first loader. By setting the `raw` flag to `true`, the loader will receive a raw `Buffer` instead of a `String`. This is useful for loaders which deal with binary filetypes, such as images.

```js
module.exports = function(content, options) {
    console.log(content instanceof Buffer); // true
    ...
};

module.exports.raw = true;
```
