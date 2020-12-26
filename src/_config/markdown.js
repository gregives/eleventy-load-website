const markdown = require("markdown-it");
const highlight = require("highlight.js");
const slugify = require("slugify");

highlight.configure({
    classPrefix: "code__",
});

module.exports = markdown({
    html: true,
    typographer: true,
    langPrefix: "code code--",
    highlight(str, lang) {
        if (lang && highlight.getLanguage(lang)) {
            try {
                return highlight.highlight(lang, str).value;
            } catch {
                // Fallback to default
            }
        }

        return "";
    },
})
    .disable("code")
    .use(require("markdown-it-attrs"))
    .use(require("markdown-it-anchor"), {
        level: 2,
        permalink: true,
        permalinkClass: "anchor",
        permalinkSymbol: "&nbsp;#",
        permalinkSpace: false,
        slugify
    });
