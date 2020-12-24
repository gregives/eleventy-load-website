const markdown = require("markdown-it");
const highlight = require("highlight.js");

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
    .use(require("markdown-it-attrs"));
