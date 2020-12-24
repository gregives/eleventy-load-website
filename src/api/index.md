# Writing a loader

An eleventy-load loader is just a JavaScript function, nothing complicated! The function is passed two arguments: the `content` of the file being loaded, and the user-provided `options` for the loader.

Let's write a loader to convert a text file to uppercase; of course, the loader just makes the content uppercase, so it could be applied to any file.

```js {data-file=".eleventy.js"}
module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(require("eleventy-load"), {
        rules: [
            {
                test: /\.txt$/,
                loaders: [
                    {
                        loader: function(content, options) {
                            return content.toUpperCase();
                        }
                    }
                ]
            }
        ]
    });
};
```

## Loader interface

- `this.addDependency`
- `this.config`
- `this.emitFile`
- `this.resource`
- `this.resourcePath`
- `this.resourceQuery`
