# Writing a loader

An eleventy-load loader is just a JavaScript function, nothing complicated! The function is passed two arguments: the `content` of the file being loaded and the user-provided `options` for the loader.

## An example loader

Let's write a loader to convert a text file to uppercase, _but only_ if the user passes `uppercase: true` as an option. Of course, this loader could be applied to any file, it just uppercases the content.

```js {data-file=".eleventy.js"}
module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(require("eleventy-load"), {
        rules: [
            {
                test: /\.txt$/,
                loaders: [
                    {
                        loader: function(content, options) {
                            return options.uppercase ? content.toUpperCase() : content;
                        },
                        options: {
                            uppercase: true
                        }
                    }
                ]
            }
        ]
    });
};
```

Instead of writing the loader in your Eleventy configuration file, you might want to move it into a module which exports the loader function.

```js {data-file="uppercase.js"}
module.exports = function(content, options) {
    return options.uppercase ? content.toUpperCase() : content;
};
```

```js {data-file=".eleventy.js"}
const uppercaseLoader = require("./uppercase");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(require("eleventy-load"), {
        rules: [
            {
                test: /\.txt$/,
                loaders: [
                    {
                        loader: upperCaseLoader,
                        options: {
                            uppercase: true
                        }
                    }
                ]
            }
        ]
    });
};
```

## Loader interface

As well as the function parameters `content` and `options`, loaders also have access to the loader context. The context of a function can be accessed using the `this` keyword.

- this.addDependency
- this.config
- this.emitFile
- this.resource
- this.resourcePath
- this.resourceQuery

### this.addDependency

Add a dependency to be processed by eleventy-load. The dependency must be relative to the Eleventy project's input directory. You should always `await` adding a dependency, as the loaders processing the dependency might be asynchronous.

```js
module.exports = async function(content, options) {
    const license = await this.addDependency("LICENSE");
    return license + content;
}
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
