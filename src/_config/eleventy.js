const markdown = require("./markdown");

module.exports = function (content) {
  // Ignore libraryOverrides "md" key
  const ignore = (key, value) => (key === "md" ? undefined : value);
  const config = JSON.stringify(this.config, ignore, 2);
  const string = `\`\`\`json\n${config}\n\`\`\``;
  return content.replace("<div data-config></div>", markdown.render(string));
};
