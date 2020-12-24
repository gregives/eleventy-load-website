const markdown = require('./markdown');

module.exports = function (content) {
    const config = JSON.stringify(
        this.config,
        (key, value) => key === "md" ? undefined : value,
        2
    );
    const string = `\`\`\`json\n${config}\n\`\`\``;
    return content.replace(
        "<div data-config></div>",
        markdown.render(string)
    );
};
