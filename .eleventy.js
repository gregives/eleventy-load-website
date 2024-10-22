const fs = require("fs");
const path = require("path");
const glob = require("glob");
const eleventy = require("./src/_config/eleventy");
const markdown = require("./src/_config/markdown");

module.exports = (config) => {
  config.addPlugin(require("eleventy-load"), {
    debug: true,
    rules: [
      {
        test: /\.(md|html)$/,
        loaders: [
          {
            loader: eleventy,
          },
          {
            loader: require("eleventy-load-html"),
            options: {
              minimize: process.env.ELEVENTY_ENV === "production",
            },
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
            options: {
              minimize: process.env.ELEVENTY_ENV === "production",
            },
          },
          {
            loader: require("eleventy-load-file"),
            options: {
              name: "[hash].css",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loaders: [
          {
            loader: require("eleventy-load-js"),
            options: {
              mode: process.env.ELEVENTY_ENV || "production",
            },
          },
          {
            loader: require("eleventy-load-file"),
          },
        ],
      },
      {
        test: /\.(woff2?)$/,
        loaders: [
          {
            loader: require("eleventy-load-file"),
          },
        ],
      },
      {
        test: /\.png$/,
        loaders: [
          {
            loader: (function () {
              const loader = (content) =>
                `data:image/png;base64,${content.toString("base64")}`;
              loader.raw = true;
              return loader;
            })(),
          },
        ],
      },
      {
        test: /\.svg$/,
        loaders: [
          {
            loader: function (content) {
              const params = new URLSearchParams(this.resourceQuery);
              if (params.has("fill")) {
                // Change fill colour of SVG
                content = content.replace(
                  'fill="currentColor"',
                  `fill="${params.get("fill")}"`
                );
              }
              const base64 = Buffer.from(content).toString("base64");
              return `data:image/svg+xml;base64,${base64}`;
            },
          },
        ],
      },
    ],
  });

  // Create directory for fonts
  const FONT_DIR = "src/_assets/styles/files";
  if (!fs.existsSync(FONT_DIR)) fs.mkdirSync(FONT_DIR, { recursive: true });

  // Copy fonts from fontsource into assets
  ["inter"].forEach((font) => {
    const files = glob.sync(`node_modules/@fontsource/${font}/files/*`);
    files.forEach((file) => {
      fs.copyFileSync(file, path.join(FONT_DIR, path.basename(file)));
    });
  });

  // Icon shortcode using Bootstrap Icons
  config.addShortcode("icon", (name, query = "") => {
    const src = `../node_modules/bootstrap-icons/icons/${name.toLowerCase()}.svg${query}`;
    const alt = name.replace(/-fill$/, "").replace("-", " ");
    return `<img class="icon" width="16" height="16" src="${src}" alt="${alt}">`;
  });

  // Extract critical CSS in production
  if (process.env.ELEVENTY_ENV === "production") {
    config.addPlugin(require("eleventy-critical-css"), {
      minify: true,
    });
  }

  // Deep merge when combining the Data Cascade
  config.setDataDeepMerge(true);

  // Options for LiquidJS
  config.setLiquidOptions({
    dynamicPartials: true,
  });

  // Options for markdown-it
  config.setLibrary("md", markdown);

  // Watch the entire input directory
  config.addWatchTarget("./src/");

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
